// Frontend/script.js

// JavaScript cho menu (giữ nguyên từ file index.html của bạn)
var navLinks = document.getElementById("navLinks");
function showMenu() {
    if (navLinks) navLinks.style.right = "0";
}
function hideMenu() {
    if (navLinks) navLinks.style.right = "-200px";
}

// JavaScript cho tải thêm tin tức
document.addEventListener('DOMContentLoaded', function() {
    const newsGridContainer = document.getElementById('newsGridContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;
    const itemsPerPage = 3; // Số lượng item muốn tải mỗi lần, phải khớp với backend nếu có limit

    async function loadNews(page) {
        try {
            // Khi dùng Nginx làm reverse proxy, URL sẽ là /api/news
            // Khi chạy trực tiếp Node server (vd: localhost:3000) và mở file HTML trực tiếp,
            // bạn cần URL đầy đủ: http://localhost:3000/api/news
            const response = await fetch(`/api/news?page=${page}&limit=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.html) {
                // newsGridContainer.innerHTML += data.html; // Thêm vào cuối
                // Hoặc để an toàn hơn và tránh lỗi re-render không mong muốn:
                const newContent = document.createElement('div');
                newContent.innerHTML = data.html;
                while(newContent.firstChild) {
                    newsGridContainer.appendChild(newContent.firstChild);
                }
            }

            if (data.hasMore) {
                loadMoreBtn.style.display = 'block'; // Hoặc 'inline-block' tùy CSS
            } else {
                loadMoreBtn.style.display = 'none';
                // Tùy chọn: Hiển thị thông báo "Đã tải hết tin"
                const endMsg = document.createElement('p');
                endMsg.textContent = "Đã tải hết tin tức.";
                endMsg.style.textAlign = "center";
                endMsg.style.marginTop = "20px";
                // Đảm bảo không thêm nhiều lần
                if (!newsGridContainer.parentNode.querySelector('.end-of-news')) {
                    endMsg.classList.add('end-of-news');
                    newsGridContainer.parentNode.insertBefore(endMsg, loadMoreBtn.nextSibling);
                }
            }
            currentPage++; // Tăng trang cho lần tải tiếp theo

        } catch (error) {
            console.error('Error loading news:', error);
            if (loadMoreBtn) loadMoreBtn.textContent = "Lỗi tải tin. Thử lại?";
            // Có thể ẩn nút nếu lỗi nghiêm trọng
        }
    }

    if (loadMoreBtn && newsGridContainer) {
        loadMoreBtn.addEventListener('click', () => {
            loadNews(currentPage);
        });

        // Tải tin tức lần đầu khi trang được load
        loadNews(currentPage);
    } else {
        if (!loadMoreBtn) console.error("Button with ID 'loadMoreBtn' not found.");
        if (!newsGridContainer) console.error("Container with ID 'newsGridContainer' not found.");
    }
});