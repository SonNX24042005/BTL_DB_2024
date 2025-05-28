function createMssvFromEmail(email) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        console.error("Địa chỉ email không hợp lệ.");
        return null;
    }
    const usernamePart = email.split('@')[0];
    const numberMatch = usernamePart.match(/(\d+)$/);
    return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
}

function sumTinChi(mssv) {

}

// Script để lấy và hiển thị thông tin sinh viên
document.addEventListener('DOMContentLoaded', function () {
    console.log("Script bắt đầu chạy."); // Kiểm tra script có chạy không

    const userEmail = localStorage.getItem('username');
    const token = localStorage.getItem('authToken');

    console.log("Token: ", token); // Kiểm tra token

    if (!userEmail) {
        console.error("Email không tìm thấy!");
        return;
    }

    const MSSV = createMssvFromEmail(userEmail); // Tạo MSSV từ email
    if (!MSSV) {
        console.error("Không thể tạo MSSV từ email:", userEmail);
        return;
    }

    console.log("MSSV được tạo:", MSSV); // Kiểm tra MSSV

    const apiUrl = `/api/grade/${MSSV}`;

    console.log("Gọi API:", apiUrl); // Kiểm tra URL

    // Gọi API để lấy tổng số tín chỉ tích lũy
    fetch(`/api/grade/${MSSV}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Thêm Authorization header nếu API yêu cầu token
            //'Authorization': `Bearer ${token}`
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
            // Cập nhật CPA lên giao diện
            document.getElementById('cpa-highlight').textContent = data.CPA || 'N/A';
            document.getElementById('cpa-value').textContent = data.CPA || 'N/A';
            document.getElementById('cpa-progress').style.width = `${(data.CPA / 4) * 100}%`;

            // Cập nhật các trường khác 
            if (data.CPA >= 3.6) {
                document.getElementById('student-rank').textContent = 'Xuất sắc';
            }
            else if (data.CPA >= 3.2) {
                document.getElementById('student-rank').textContent = 'Giỏi';
            } else if (data.CPA >= 2.5) {
                document.getElementById('student-rank').textContent = 'Khá';
            } else if (data.CPA >= 2.0) {
                document.getElementById('student-rank').textContent = 'Trung bình';
            } else {
                document.getElementById('student-rank').textContent = 'Yếu';
            }
        })
        .catch(error => {
            console.error("Lỗi khi lấy CPA:", error);
            document.getElementById('cpa-highlight').textContent = 'Không thể tải CPA';
            document.getElementById('cpa-value').textContent = 'Không thể tải CPA';
            document.getElementById('cpa-progress').style.width = '0%';
        });

    fetch(`/api/test1/${MSSV}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Thêm Authorization header nếu API yêu cầu token
            //'Authorization': `Bearer ${token}`
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
            // Cập nhật tổng số tín chỉ tích lũy lên giao diện
            document.getElementById('tc-value').textContent = data.total || 'N/A';
            document.getElementById('tc-highlight').textContent = data.total || 'N/A';
        })
        .catch(error => {
            console.error("Lỗi khi lấy CPA:", error);
            document.getElementById('tc-progress').textContent = 'Không thể tải tổng số tín chỉ tích lũy';
            document.getElementById('tc-value').textContent = 'Không thể tải tổng số tín chỉ tích lũy';
        });

    // Xử lý dropdown menu trên mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');

            link.addEventListener('click', function (e) {
                if (menu) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }


});