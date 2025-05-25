

// Hàm để định dạng ngày sinh
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Script để lấy và hiển thị thông tin sinh viên
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script bắt đầu chạy."); // Kiểm tra script có chạy không

    const userEmail = localStorage.getItem('username');
    console.log("Email lấy từ localStorage:", userEmail); // Kiểm tra email

    if (!userEmail) {
        console.error("Email không tìm thấy!");
        return;
    }

    const apiUrl = `/api/students/${userEmail}`;
    console.log("Gọi API:", apiUrl); // Kiểm tra URL

    // Gọi API để lấy thông tin sinh viên
    fetch(`/api/students/${userEmail}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Thêm Authorization header nếu API yêu cầu token
            // 'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            // Thử đọc nội dung lỗi nếu có
            return response.json().then(err => {
                 throw new Error(`Lỗi ${response.status}: ${err.message || 'Không thể lấy dữ liệu'}`);
            });
        }
        return response.json();
    })
    .then(data => {
        // Cập nhật thông tin lên giao diện
        document.getElementById('student-name-sidebar').textContent = data['Họ và tên'] || 'N/A';
        document.getElementById('student-id-sidebar').textContent = `MSSV: ${data.MSSV || 'N/A'}`;

        document.getElementById('student-name').textContent = data['Họ và tên'] || 'N/A';
        document.getElementById('student-dob').textContent = formatDate(data['Ngày sinh']);
        document.getElementById('student-gender').textContent = data['Giới tính'] || 'N/A';
        document.getElementById('student-cccd').textContent = data.CCCD || 'N/A';
        document.getElementById('student-email').textContent = data.Email || 'N/A';
        document.getElementById('student-phone').textContent = data.SDT || 'N/A';

        document.getElementById('student-school').textContent = data['Trường'] || 'N/A';
        document.getElementById('student-major').textContent = data['Ngành'] || 'N/A';
        document.getElementById('student-class').textContent = data['Lớp'] || 'N/A';

        // Cập nhật các trường khác 
    })
    .catch(error => {
        console.error('Lỗi khi lấy thông tin sinh viên:', error);
        document.getElementById('student-name').textContent = 'Không thể tải thông tin';
        document.getElementById('student-id-sidebar').textContent = `MSSV: Lỗi`;
        // Cập nhật các trường khác thành lỗi
        const fields = ['student-dob', 'student-gender', 'student-cccd', 'student-email', 'student-phone', 'student-school', 'student-major', 'student-class'];
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = 'Lỗi';
        });
    });

    // Xử lý dropdown menu trên mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');

            link.addEventListener('click', function(e) {
                 if(menu) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                 }
            });
        });
    }

    // Xử lý đăng xuất
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
});