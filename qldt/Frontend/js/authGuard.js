(function() {
    const token = localStorage.getItem('authToken');
    const currentPage = window.location.pathname; // Lấy đường dẫn hiện tại của trang

    // Danh sách các trang không yêu cầu đăng nhập (ví dụ)
    const publicPages = [
        '../DangNhap/DangNhap.html',
        '../DangXuat/DangXuat.html'          
    ];

    // Kiểm tra xem trang hiện tại có phải là một trong các trang công khai không
    let isPublicPage = false;
    for (let i = 0; i < publicPages.length; i++) {
        if (currentPage.endsWith(publicPages[i])) { 
            isPublicPage = true;
            break;
        }
    }
    // Nếu không có token VÀ trang hiện tại KHÔNG PHẢI là trang công khai
    if (!token && !isPublicPage) {
        console.log('AuthGuard: Không có token, chuyển hướng về đăng nhập từ trang:', currentPage);

        window.location.href = '../DangNhap/DangNhap.html'; // Đường dẫn tương đối
        
        // window.location.href = '/DangNhap/DangNhap.html';
    } else if (token && isPublicPage && currentPage.endsWith('/DangNhap/DangNhap.html')) {
        // Nếu đã đăng nhập mà lại vào trang đăng nhập, có thể chuyển hướng về trang chủ
        console.log('AuthGuard: Đã đăng nhập, chuyển hướng khỏi trang đăng nhập về trang chủ.');
        window.location.href = '/';
    }
})();

