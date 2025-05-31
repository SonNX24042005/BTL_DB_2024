document.addEventListener('DOMContentLoaded', function () {
    const courseCodeInput = document.getElementById('courseCode');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const removeCourseBtn = document.getElementById('removeCourseBtn');
    const submitRegistrationBtn = document.getElementById('submitRegistrationBtn');
    const coursesTableBody = document.getElementById('coursesTableBody');
    const alertMessage = document.getElementById('alertMessage');

    function createMssvFromEmail(email) {
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            console.error("Địa chỉ email không hợp lệ.");
            return null;
        }
        const usernamePart = email.split('@')[0];
        const numberMatch = usernamePart.match(/(\d+)$/);
        return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
    }

    // Function to show alert message
    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = 'alert';
        alertMessage.classList.add(`alert-${type}`);
        alertMessage.style.display = 'block';

        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 3000);
    }

    //Fution to showSelect options for semester
    async function loadSemesters() {
        try {
            const response = await fetch('/api/hocky');
            const semesters = await response.json();

            const select = document.getElementById('semesterSelect');
            select.innerHTML = '<option value="">-- Chọn kì học --</option>';

            semesters.forEach(sem => {
                const option = document.createElement('option');
                option.value = sem;
                option.textContent = sem;
                select.appendChild(option);
            });

            if (semesters.length > 0) {
                select.value = semesters[0];
            }
        } catch (error) {
            console.error('Lỗi load kỳ học:', error);
        }
    }

    loadSemesters();

    async function addCourse() {
        const courseCode = courseCodeInput.value.trim().toUpperCase();
        const selectedSemester = document.getElementById('semesterSelect').value;

        if (!selectedSemester) {
            showAlert('Vui lòng chọn kỳ học trước khi thêm môn!', 'warning');
            return;
        }

        if (!courseCode) {
            showAlert('Vui lòng nhập mã môn học!', 'danger');
            return;
        }

        try {
            const response = await fetch(`/api/monhoc/${courseCode}`);
            if (!response.ok) {
                throw new Error('Mã môn học không tồn tại trong hệ thống!');
            }

            const courseData = await response.json();

            // Kiểm tra môn học đã tồn tại trong bảng chưa
            const existingRows = coursesTableBody.querySelectorAll('tr');
            for (let row of existingRows) {
                if (row.cells[1].textContent === courseCode) {
                    showAlert('Môn học này đã được thêm vào danh sách!', 'info');
                    return;
                }
            }

            // Tạo dòng mới với kỳ học đã chọn
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td><input type="checkbox" class="course-checkbox"></td>
            <td>${courseData.maHP}</td>
            <td>${courseData.tenHP}</td>
            <td>${courseData.hinhThuc}</td>
            <td>${selectedSemester}</td>
            <td>Chưa đăng ký</td>
        `;

            coursesTableBody.appendChild(newRow);
            showAlert('Đã thêm môn học vào danh sách!', 'success');

        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    // Gắn sự kiện cho nút thêm học phần
    addCourseBtn.addEventListener('click', addCourse);

    async function removeCourses() {
        const checkboxes = document.querySelectorAll('.course-checkbox:checked');
        if (checkboxes.length === 0) {
            showAlert('Vui lòng chọn ít nhất một môn học để xóa!', 'danger');
            return;
        }

        const coursesToDelete = [];

        checkboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const status = row.cells[5].textContent.trim();

            if (status === 'Đã đăng ký') {
                // Môn đã đăng ký, cần xóa trên server
                coursesToDelete.push({
                    MaHP: row.cells[1].textContent.trim(),
                    MaKyHoc: row.cells[4].textContent.trim()  // <-- Đã sửa
                });
            }
        });

        try {
            if (coursesToDelete.length > 0) {
                // Gọi API xóa môn đã đăng ký
                await deleteRegisteredCourses(MSSV, coursesToDelete);
            }

            // Xóa các dòng checkbox được tick khỏi bảng
            checkboxes.forEach(checkbox => {
                const row = checkbox.closest('tr');
                row.remove();
            });

            showAlert('Đã xóa các môn học được chọn!', 'success');

        } catch (error) {
            console.error('Lỗi khi xóa:', error);
            showAlert('Có lỗi xảy ra khi xóa học phần!', 'danger');
        }
    }

    // Gắn sự kiện cho nút xóa học phần
    removeCourseBtn.addEventListener('click', removeCourses);

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

    async function submitRegistration() {
        const rows = coursesTableBody.querySelectorAll('tr');
        const selectedCourses = [];

        const selectedSemester = document.getElementById('semesterSelect').value;

        if (!selectedSemester) {
            showAlert('Vui lòng chọn kỳ học trước khi gửi đăng ký!', 'danger');
            return;
        }

        rows.forEach(row => {
            if (row.dataset.markedForRemoval === 'true') return;

            const status = row.cells[5].textContent.trim();
            if (status === 'Đã đăng ký') return;

            const maHP = row.cells[1].textContent;

            selectedCourses.push({
                MSSV: MSSV,
                MaHP: maHP,
                MaKyHoc: selectedSemester
            });
        });

        if (selectedCourses.length === 0) {
            showAlert('Danh sách đăng ký trống!', 'danger');
            return;
        }

        try {
            const response = await fetch(`/api/dangky/${MSSV}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courses: selectedCourses.map(({ MaHP, MaKyHoc }) => ({ MaHP, MaKyHoc })) })
            });

            const data = await response.json();

            if (!response.ok) {
                showAlert(data.message || 'Gửi đăng ký thất bại!', 'danger');
                return;
            }

            rows.forEach(row => {
                if (row.dataset.markedForRemoval === 'true') {
                    row.remove();
                } else {
                    row.cells[5].textContent = 'Đã đăng ký';
                    row.cells[5].className = 'status-registered';
                }
            });

            showAlert('Đăng ký học tập thành công!', 'success');
        } catch (error) {
            console.error('Lỗi khi gửi đăng ký:', error);
            showAlert('Có lỗi xảy ra khi gửi đăng ký!', 'danger');
        }
    }
    // Gắn sự kiện cho nút gửi đăng ký
    submitRegistrationBtn.addEventListener('click', submitRegistration);

    // Hiển thị danh sách học phần đã đăng ký
    async function fetchRegisteredCourses(MSSV) {
        try {
            const response = await fetch(`/api/dadangky/${MSSV}`);
            if (!response.ok) {
                throw new Error('Lỗi khi gọi API lấy học phần đã đăng ký');
            }

            const courses = await response.json();
            renderRegisteredCourses(courses); // Gọi đúng tên biến
        } catch (error) {
            console.error('Lỗi:', error.message);
        }
    }

    document.getElementById('semesterSelect').addEventListener('change', () => {
        fetchRegisteredCourses(MSSV);
    });


    function renderRegisteredCourses(courses) {

        coursesTableBody.innerHTML = ""; // Xóa bảng cũ

        const selectedSemester = document.getElementById('semesterSelect').value;

        const filteredCourses = courses.filter(course => course.kyHoc === selectedSemester);

        filteredCourses.forEach(course => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td><input type="checkbox" class="course-checkbox"></td>
            <td>${course.maHP}</td>
            <td>${course.tenHP}</td>
            <td>${course.hinhThuc || ''}</td>
            <td>${course.kyHoc}</td>
            <td class="status-registered">Đã đăng ký</td>
        `;

            coursesTableBody.appendChild(row);
        });
    }

    fetchRegisteredCourses(MSSV); // Gọi hàm để lấy danh sách học phần đã đăng ký

    //Xóa học phần đã đăng ký
    async function deleteRegisteredCourses(MSSV, courses) {
        try {
            const response = await fetch(`/api/xoadangky/${MSSV}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courses })
            });

            if (!response.ok) {
                throw new Error('Lỗi khi xóa học phần đã đăng ký');
            }

            const data = await response.json();
            showAlert(data.message || 'Xóa học phần thành công!', 'success');
            fetchRegisteredCourses(MSSV); // Cập nhật lại danh sách
        } catch (error) {
            console.error('Lỗi:', error.message);
            showAlert('Có lỗi xảy ra khi xóa học phần!', 'danger');
        }
    }

});