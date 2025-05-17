// Frontend/TrangChu.js (hoặc script.js nếu tên file là vậy trong index.html)

// JavaScript cho menu (giữ nguyên từ file index.html của bạn)
var navLinks = document.getElementById("navLinks");
function showMenu() {
    if (navLinks) navLinks.style.right = "0";
}
function hideMenu() {
    if (navLinks) navLinks.style.right = "-200px";
}

// JavaScript cho tải thêm tin tức
document.addEventListener('DOMContentLoaded', function () {
    const newsGridContainer = document.getElementById('newsGridContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const itemsPerPage = 3; // Số lượng item muốn tải mỗi lần, phải khớp với backend

    async function loadNews(pageToLoad) {
        if (!newsGridContainer || !loadMoreBtn) {
            console.error("Không tìm thấy newsGridContainer hoặc loadMoreBtn.");
            return;
        }

        loadMoreBtn.disabled = true; // Vô hiệu hóa nút trong khi tải
        loadMoreBtn.textContent = "ĐANG TẢI...";

        try {
            // URL API bao gồm page và limit
            const response = await fetch(`/api/news?page=${pageToLoad}&limit=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.html && data.html.trim() !== "") {
                // newsGridContainer.innerHTML += data.html; // Thêm HTML mới vào cuối
                // Để tránh các vấn đề tiềm ẩn với innerHTML +=, sử dụng DOMParser hoặc appendChild
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.html, 'text/html');
                Array.from(doc.body.children).forEach(child => {
                    newsGridContainer.appendChild(child.cloneNode(true)); // cloneNode(true) để copy cả nội dung bên trong
                });

            } else if (pageToLoad === 1) { // Nếu là trang đầu và không có tin
                 newsGridContainer.innerHTML = "<p style='text-align:center;'>Hiện chưa có tin tức nào.</p>";
            }


            if (data.hasMore) {
                loadMoreBtn.style.display = 'block'; // Hiển thị nút nếu còn tin
                currentPage++; // Chuẩn bị cho trang tiếp theo
            } else {
                loadMoreBtn.style.display = 'none'; // Ẩn nút nếu đã hết tin
                // Tùy chọn: Hiển thị thông báo "Đã tải hết tin"
                const endMsg = document.createElement('p');
                endMsg.textContent = "Đã tải hết tin tức.";
                endMsg.style.textAlign = "center";
                endMsg.style.marginTop = "20px";
                // Đảm bảo không thêm nhiều lần
                if (!newsGridContainer.parentNode.querySelector('.end-of-news')) {
                    endMsg.classList.add('end-of-news');
                    // Chèn sau newsGridContainer thay vì sau nút (vì nút có thể bị ẩn)
                    newsGridContainer.parentNode.insertBefore(endMsg, newsGridContainer.nextSibling);
                }
            }

        } catch (error) {
            console.error('Lỗi khi tải tin tức:', error);
            if (loadMoreBtn) loadMoreBtn.textContent = "Lỗi tải tin. Thử lại?";
            // Bạn có thể thêm logic để thử lại sau một khoảng thời gian hoặc hiển thị thông báo lỗi chi tiết hơn
        } finally {
            if (loadMoreBtn) {
                loadMoreBtn.disabled = false; // Kích hoạt lại nút
                if(loadMoreBtn.style.display !== 'none') { // Chỉ đổi text nếu nút còn hiển thị
                    loadMoreBtn.textContent = "HIỂN THỊ THÊM";
                }
            }
        }
    }

    // Load link sự kiện (phần này giữ nguyên nếu không liên quan trực tiếp đến tin tức)
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            const eventList = document.querySelector(".timeline");
            if (!eventList) {
                console.error("Không tìm thấy phần tử danh sách sự kiện (.timeline)");
                return;
            }
            // Kiểm tra events có phải là mảng không trước khi dùng map
            if (Array.isArray(events)) {
                eventList.innerHTML = events.map(event => `
                    <li class="event">
                        <h3>📣 <a href="${event.link}" target="_blank">${event.title}</a></h3>
                        <p>⏰ ${event.date}</p>
                        <p>⛳ ${event.location}</p>
                    </li>
                `).join('');
            } else {
                console.error("Dữ liệu sự kiện không phải là một mảng:", events);
                eventList.innerHTML = "<p>Không thể tải danh sách sự kiện.</p>";
            }
        })
        .catch(error => {
            console.error("Lỗi khi tải dữ liệu sự kiện:", error);
            const eventList = document.querySelector(".timeline");
            if(eventList) eventList.innerHTML = "<p>Lỗi tải danh sách sự kiện.</p>";
        });


    if (loadMoreBtn && newsGridContainer) {
        loadMoreBtn.addEventListener('click', () => {
            loadNews(currentPage); // Tải trang hiện tại (currentPage đã được tăng sau lần tải thành công trước)
        });

        // Tải tin tức lần đầu khi trang được load
        loadNews(currentPage);
    } else {
        if (!loadMoreBtn) console.error("Nút với ID 'loadMoreBtn' không tìm thấy.");
        if (!newsGridContainer) console.error("Container với ID 'newsGridContainer' không tìm thấy.");
    }
});