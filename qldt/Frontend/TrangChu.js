<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đồ Án - Đại học Bách Khoa Hà Nội</title>
    <script src="../js/authGuard.js" defer></script>

<style>
:root {
    --primary-color: rgb(186, 28, 28); /* #BA1C1C which is close to #CC1628 */
    --secondary-color: #2980b9;
    --accent-color: #f39c12;
    --text-color: #333;
    --light-gray: #f5f5f5;
    --dark-gray: #e0e0e0;
    --white: #ffffff;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f0f2f5; /* Changed from #ddd for consistency */
    min-height: 100vh;
    display : flex;
    flex-direction: column;
    color: var(--text-color);
}

.container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    flex : 1;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
}

/* --- Start: Nav Styles from TrangChu.css --- */
.header {
    width: 100%;
    /* Removed background image header style */
    background-color: #f0f2f5; /* Keep it simple */
}

nav img {
    width: 120px !important;
    height: auto !important;
    margin-left: 30px;
}

nav{
    display: flex;
    position: sticky; /* Use sticky */
    top: 0;
    padding: 15px 6%;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    background-color: rgba(13, 12, 12, 0.89);
    z-index: 1000;
}

.nav-links{
    flex: 1;
    text-align: right;
}

.nav-links ul li{
    list-style: none;
    display: inline-block;
    padding: 5px 10px; /* From TrangChu.css */
    position: relative;
    margin-right: 15px;
}

.nav-links ul li a{
    color:azure;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
}

.nav-links ul li::after{
    content: '';
    width: 0%;
    height: 2px;
    background: var(--primary-color); /* #CC1628 */
    display: block;
    margin: auto;
    transition: 0.5s;
}

.nav-links ul li:hover::after{
    width: 100%;
}

/* Dropdown menu chung - from TrangChu.css */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right:auto;
    background: rgba(30, 30, 30, 0.95);
    display: block; /* Important: Use opacity/transform for show/hide */
    width: max-content;
    min-width: 200px; /* Ensure a decent width */
    padding: 5px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: var(--border-radius);
    z-index: 1100;
    opacity: 0;
    transform: translateY(-10px); /* Start higher */
    transition: opacity 0.3s ease, transform 0.3s ease;
    list-style: none;
    pointer-events: none; /* Prevent interaction when hidden */
}

.dropdown-menu li {
    list-style: none;
    padding: 5px 0;
    transition: background 0.3s ease-in-out;
    text-align: left;
    display:block !important;
}

.dropdown-menu li a {
    display: block;
    color: white;
    padding: 10px 20px; /* Adjusted padding */
    transition: 0.3s ease-in-out;
    text-decoration: none;
}

.dropdown-menu li a:hover {
    background: var(--primary-color); /* #cc1628 */
    display:block;
    color: var(--white);
}

/* Hiển thị menu khi hover */
.dropdown:hover .dropdown-menu {
    display: block;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Allow interaction when shown */
}

/* --- End: Nav Styles from TrangChu.css --- */


/* Mobile Responsive (Simplified - needs testing/refining) */
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }
    .nav-links {
        width: 100%;
        text-align: left;
        margin-top: 15px;
    }
    .nav-links ul li {
        display: block;
        margin: 10px 0;
    }
    .dropdown-menu {
        position: static;
        opacity: 1;
        transform: none;
        width: 100%;
        box-shadow: none;
        background: rgba(50, 50, 50, 0.9);
        display: none;
        border-radius: 0;
    }
   .dropdown:hover .dropdown-menu {
        display: block;
    }
}

.wrapper {
    display: flex;
    flex-direction: column;
    flex : 1;
}

footer {
    text-align: center;
    margin-top: 20px;
    width: 100%;
}
footer img {
    width: 100%;
    display: block;
}

/* Styles for DoAn page content */
.container h1, .container h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--dark-gray);
    padding-bottom: 10px;
}

.container h1 {
    text-align: center;
    font-size: 2em;
}

.project-section {
    background-color: var(--light-gray);
    padding: 20px;
    margin-bottom: 25px;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.project-section h3 {
    color: var(--secondary-color);
    margin-bottom: 15px;
    font-size: 1.3em;
}

.project-info p, .project-info li {
    margin-bottom: 10px;
    line-height: 1.6;
}

.project-info strong {
    color: var(--text-color);
    min-width: 180px;
    display: inline-block;
}

.project-info ul {
    list-style: disc;
    margin-left: 20px;
}

.status-registered {
    border-left: 5px solid #2ecc71; /* Green for registered */
    padding-left: 15px;
}

.status-not-registered {
    border-left: 5px solid #e74c3c; /* Red for not registered */
    padding-left: 15px;
    color: #e74c3c;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: var(--white);
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    margin-right: 10px;
}

.btn:hover {
    background-color: #a01a1a; /* Darker red */
}

</style>
</head>
    <body>
    <section class="header">
        <nav>
            <a href="../index.html"><img src="../images/logo.png" alt="Logo trường"></a>
            <div class="nav-links" id="navLinks">
                <ul>
                    <li><a href="../index.html">TRANG CHỦ</a></li>
                    <li class="dropdown">
                        <a href="#">HỌC TẬP</a>
                        <ul class="dropdown-menu">
                            <li><a href="../LichHoc/LichHoc.html">THỜI KHÓA BIỂU</a></li>
                            <li><a href="../BangDiem/BangDiem.html">BẢNG ĐIỂM</a></li>
                            <li><a href="../DoAn/DoAn.html">ĐỒ ÁN</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">CHƯƠNG TRÌNH ĐÀO TẠO</a>
                        <ul class="dropdown-menu">
                            <li><a href="../ChuongTrinhDaoTao/ChuongTrinhDaoTao.html">CHƯƠNG TRÌNH ĐÀO TẠO</a></li>
                            <li><a href="../DangKyHocTap/DangKyHocTap.html">ĐĂNG KÍ HỌC TẬP</a></li>
                            <li><a href="../ChuongTrinhTraoDoi/ChuongTrinhTraoDoi.html">CHƯƠNG TRÌNH TRAO ĐỔI</a></li>
                            <li><a href="../HocBong/HocBong.html">HỌC BỔNG</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#">TÀI KHOẢN</a>
                        <ul class="dropdown-menu">
                            <li><a href="../ThongTinSinhVien/ThongTinSinhVien.html">THÔNG TIN</a></li>
                            <li><a href="../DangXuat/DangXuat.html">ĐĂNG XUẤT</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
    <div class = "wrapper">
        <div class="container">
            <h1>Thông tin Đồ án Tốt nghiệp</h1>

            <div class="project-section">
                <h2>Trạng thái Đồ án</h2>
                <div class="project-info status-registered"> <p><strong>Sinh viên:</strong> Nguyễn Văn A</p>
                    <p><strong>Mã số sinh viên:</strong> 20201234</p>
                    <p><strong>Tên đề tài:</strong> Xây dựng hệ thống quản lý sinh viên dựa trên Web</p>
                    <p><strong>Giảng viên hướng dẫn:</strong> TS. Trần Thị B</p>
                    <p><strong>Ngày bắt đầu:</strong> 01/09/2024</p>
                    <p><strong>Dự kiến hoàn thành:</strong> 30/01/2025</p>
                    <p><strong>Trạng thái:</strong> Đang thực hiện</p>
                    <a href="#" class="btn">Nộp Báo cáo</a>
                </div>
                 </div>

            <div class="project-section" id="dang-ky">
                <h2>Đăng ký Đồ án</h2>
                <div class="project-info">
                    <p>Thời gian đăng ký đồ án cho học kỳ 2024.2: <strong>15/08/2024 - 30/08/2024</strong>.</p>
                    <p>Sinh viên cần đáp ứng các điều kiện tiên quyết (số tín chỉ tích lũy, điểm trung bình,...) theo quy định của Viện/Trường.</p>
                    <p>Quy trình đăng ký:</p>
                    <ul>
                        <li>Tham khảo danh sách đề tài và giảng viên hướng dẫn.</li>
                        <li>Liên hệ giảng viên để thống nhất đề tài.</li>
                        <li>Điền và nộp phiếu đăng ký online trên hệ thống CTTT.</li>
                        <li>Theo dõi kết quả phê duyệt từ Viện/Trường.</li>
                    </ul>
                    <a href="#" class="btn">Xem danh sách đề tài</a>
                    <a href="#" class="btn">Đăng ký Đồ án</a>
                </div>
            </div>

        </div>
    </div>
     <footer>
        <img src="../images/footer.jpeg" style="width: 100%;">
    </footer>
    </body>
</html>