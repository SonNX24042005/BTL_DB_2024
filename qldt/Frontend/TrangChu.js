// JavaScript cho menu
var navLinks = document.getElementById("navLinks");
function showMenu() {
    if (navLinks) navLinks.style.right = "0";
}
function hideMenu() {
    if (navLinks) navLinks.style.right = "-200px";
}

// Hàm tiện ích để fetch API với token xác thực
async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        alert('Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
        window.location.href = '/DangNhap/DangNhap.html'; // Đảm bảo đây là đường dẫn đúng đến trang đăng nhập
        throw new Error('Unauthorized');
    }
    return response;
}

// Hàm kiểm tra trạng thái đăng nhập và cài đặt UI
function checkLoginStatusAndSetupUI() {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    const currentPath = window.location.pathname;

    if (!token) {
        // nếu không có token thì nên chuyển hướng
        if (currentPath !== '/DangNhap/DangNhap.html' && !currentPath.endsWith('DangNhap.html')) {
            console.log('Không có token, chuyển hướng về đăng nhập từ TrangChu.js.');
            window.location.href = '/DangNhap/DangNhap.html';
        }
        return false; // Chưa đăng nhập
    } else {
        // Đã đăng nhập
        console.log(`Người dùng ${username} đã đăng nhập.`);
        updateAccountMenu(username);
        return true; // Đã đăng nhập
    }
}

function updateAccountMenu(username) {
    // Tìm menu "TÀI KHOẢN"
    const navLinksUl = document.querySelector('.nav-links ul');
    if (!navLinksUl) return;

    let taiKhoanLi = null;
    //tìm ink "TÀI KHOẢN"
    const allLiElements = navLinksUl.querySelectorAll('li.dropdown > a');
    allLiElements.forEach(aElement => {
        if (aElement.textContent.trim().toUpperCase() === 'TÀI KHOẢN') {
            taiKhoanLi = aElement.parentElement;
        }
    });


    if (taiKhoanLi) {
        const dropdownMenu = taiKhoanLi.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.innerHTML = `
                <li><a href="ThongTinSinhVien/ThongTinSinhVien.html">THÔNG TIN</a></li>
                <li><a href="#" id="logoutButton">ĐĂNG XUẤT</a></li>
            `;
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('username');
                    // alert('Đã đăng xuất thành công.');
                    window.location.href = '/DangXuat/DangXuat.html';
                });
            }
        }
    } else {
        console.warn("Không tìm thấy menu 'TÀI KHOẢN' để cập nhật.");
    }
}


// JavaScript cho tải thêm tin tức và sự kiện
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = checkLoginStatusAndSetupUI();

    if (!isLoggedIn && window.location.pathname !== '/DangNhap/DangNhap.html' && !window.location.pathname.endsWith('DangNhap.html')) {
        // Nếu checkLoginStatusAndSetupUI đã thực hiện chuyển hướng, không cần làm gì thêm ở đây.
        //đảm bảo không chạy code tiếp nếu chưa login và đang không ở trang đăng nhập.
        console.log("Chưa đăng nhập, dừng thực thi các hàm tải dữ liệu trên TrangChu.js");
        return;
    }


    const newsGridContainer = document.getElementById('newsGridContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const itemsPerPage = 3;

    async function loadNews(pageToLoad) {
        if (!newsGridContainer || !loadMoreBtn) {
            // console.error("Không tìm thấy newsGridContainer hoặc loadMoreBtn trong loadNews.");
            return;
        }

        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "ĐANG TẢI...";

        try {
            // Sử dụng fetchWithAuth cho API tin tức
            const response = await fetchWithAuth(`/api/news?page=${pageToLoad}&limit=${itemsPerPage}`);
            if (!response.ok) {
                // fetchWithAuth đã xử lý lỗi 401, các lỗi khác sẽ vào đây
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = await response.json();

            if (data.html && data.html.trim() !== "") {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.html, 'text/html');
                Array.from(doc.body.children).forEach(child => {
                    newsGridContainer.appendChild(child.cloneNode(true));
                });
            } else if (pageToLoad === 1) {
                 newsGridContainer.innerHTML = "<p style='text-align:center;'>Hiện chưa có tin tức nào.</p>";
            }

            if (data.hasMore) {
                loadMoreBtn.style.display = 'block';
                currentPage++;
            } else {
                loadMoreBtn.style.display = 'none';
                const endMsg = document.createElement('p');
                endMsg.textContent = "Đã tải hết tin tức.";
                endMsg.style.textAlign = "center";
                endMsg.style.marginTop = "20px";
                if (!newsGridContainer.parentNode.querySelector('.end-of-news')) {
                    endMsg.classList.add('end-of-news');
                    newsGridContainer.parentNode.insertBefore(endMsg, newsGridContainer.nextSibling);
                }
            }
        } catch (error) {
            if (error.message !== 'Unauthorized') { // Chỉ log lỗi nếu không phải lỗi 401 đã được xử lý bởi fetchWithAuth
                console.error('Lỗi khi tải tin tức:', error);
                if (loadMoreBtn) loadMoreBtn.textContent = "Lỗi tải tin. Thử lại?";
            }
        } finally {
            if (loadMoreBtn) {
                loadMoreBtn.disabled = false;
                if(loadMoreBtn.style.display !== 'none') {
                    loadMoreBtn.textContent = "HIỂN THỊ THÊM";
                }
            }
        }
    }

    async function loadEvents() {
        const eventList = document.querySelector(".timeline");
        if (!eventList) {
            // console.error("Không tìm thấy phần tử danh sách sự kiện (.timeline) trong loadEvents.");
            return;
        }

        try {
            // Sử dụng fetchWithAuth cho API sự kiện
            const response = await fetchWithAuth('/api/events');
            if (!response.ok) {
                // fetchWithAuth đã xử lý lỗi 401, các lỗi khác sẽ vào đây
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const events = await response.json();

            if (Array.isArray(events) && events.length > 0) {
                eventList.innerHTML = events.map(event => `
                    <li class="event">
                        <h3>📣 <a href="${event.link}" target="_blank">${event.title}</a></h3>
                        <p>⏰ ${event.date}</p>
                        <p>⛳ ${event.location}</p>
                    </li>
                `).join('');
            } else if (Array.isArray(events) && events.length === 0) {
                eventList.innerHTML = "<p>Hiện chưa có sự kiện nào.</p>";
            }
            else {
                console.error("Dữ liệu sự kiện không phải là một mảng:", events);
                eventList.innerHTML = "<p>Không thể tải danh sách sự kiện (dữ liệu không hợp lệ).</p>";
            }
        } catch (error) {
             if (error.message !== 'Unauthorized') { // Chỉ log lỗi nếu không phải lỗi 401 đã được xử lý bởi fetchWithAuth
                console.error("Lỗi khi tải dữ liệu sự kiện:", error);
                if(eventList) eventList.innerHTML = "<p>Lỗi tải danh sách sự kiện.</p>";
            }
        }
    }

    // Chỉ tải dữ liệu nếu người dùng đã đăng nhập (hoặc nếu các API này là public)
    // Dựa vào isLoggedIn trả về từ checkLoginStatusAndSetupUI
    if (isLoggedIn || (window.location.pathname !== '/DangNhap/DangNhap.html' && !window.location.pathname.endsWith('DangNhap.html'))) {
        if (loadMoreBtn && newsGridContainer) {
            loadMoreBtn.addEventListener('click', () => {
                loadNews(currentPage);
            });
            loadNews(currentPage); // Tải tin tức lần đầu
        } else {
            // if (!loadMoreBtn) console.warn("Nút 'loadMoreBtn' không tìm thấy, không thể gắn sự kiện hoặc tải tin tức.");
            // if (!newsGridContainer) console.warn("Container 'newsGridContainer' không tìm thấy, không thể tải tin tức.");
        }
        loadEvents(); // Tải sự kiện
    }
});