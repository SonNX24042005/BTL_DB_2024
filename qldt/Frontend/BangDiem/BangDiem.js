// Biến lưu thông tin môn học đang được phúc khảo
let currentSubject = '';
let currentSubjectCode = '';

function formatSemesterName(semesterCode) {
    if (!semesterCode || typeof semesterCode !== 'string' || semesterCode.length < 5) {
        return semesterCode; // Trả về mã gốc nếu không hợp lệ
    }
    const year = parseInt(semesterCode.substring(0, 4), 10);
    const term = semesterCode.substring(4);

    let termName = '';
    switch (term) {
        case '1':
            termName = `Học kỳ 1 - Năm học ${year}-${year + 1}`;
            break;
        case '2':
            termName = `Học kỳ 2 - Năm học ${year}-${year + 1}`;
            break;
        case '3':
            termName = `Học kỳ Hè - Năm học ${year}-${year + 1}`;
            break;
        default:
            termName = `Học kỳ ${term} - Năm học ${year}-${year + 1}`;
    }
    return termName;
}

function mapGradeToScale(gradeLetter) {
    const scale = {
        'A+': 4.0, 'A': 4.0,
        'B+': 3.5, 'B': 3.0,
        'C+': 2.5, 'C': 2.0,
        'D+': 1.5, 'D': 1.0,
        'F': 0.0
    };
    return scale[gradeLetter?.toUpperCase()] ?? 0; // Trả về 0 nếu không khớp hoặc null/undefined
}


function getTeacherBySubjectCode(code) {
    const teacherMap = {
        'IT1005': 'PGS.TS Nguyễn Văn B', 'IT2001': 'TS. Trần Thị C',
        'IT2002': 'PGS.TS Lê Văn D', 'IT2003': 'TS. Phạm Thị E',
        'JP1001': 'TS. Takahashi F', 'IT2004': 'PGS.TS Nguyễn Văn G',
        'IT2005': 'TS. Trần Văn H', 'IT2006': 'TS. Lê Thị I',
        'IT2007': 'PGS.TS Phạm Văn J', 'JP1002': 'TS. Yamamoto K',
        'IT3001': 'PGS.TS Nguyễn Văn L', 'IT3002': 'TS. Trần Thị M',
        'IT3003': 'PGS.TS Lê Văn N', 'IT3004': 'TS. Phạm Văn O',
        'JP1003': 'TS. Suzuki P'
    };
    return teacherMap[code] || 'Không xác định';
}

function createMssvFromEmail(email) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        console.error("Địa chỉ email không hợp lệ.");
        return null;
    }
    const usernamePart = email.split('@')[0];
    const numberMatch = usernamePart.match(/(\d+)$/);
    return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
}

// --- Các hàm Modal Phúc khảo ---

function openModal(subject, code) {
    currentSubject = subject;
    currentSubjectCode = code;
    const modalInfo = document.getElementById('modalInfo');
    const reviewModal = document.getElementById('reviewModal');
    const reviewContent = document.getElementById('reviewContent');

    if (modalInfo) {
        modalInfo.innerHTML = `
            <p><strong>Môn học:</strong> ${subject}</p>
            <p><strong>Mã môn học:</strong> ${code}</p>
            <p><strong>Giáo viên phụ trách:</strong> ${getTeacherBySubjectCode(code)}</p>
        `;
    }
    if (reviewContent) reviewContent.value = '';
    if (reviewModal) reviewModal.style.display = 'block';
}

function closeModal() {
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) reviewModal.style.display = 'none';
}

function submitReview() {
    const contentElement = document.getElementById('reviewContent');
    if (!contentElement) return;
    const content = contentElement.value.trim();
    if (content === '') {
        alert('Vui lòng nhập nội dung yêu cầu phúc khảo!');
        return;
    }
    alert(`Đã gửi yêu cầu phúc khảo môn ${currentSubject} (${currentSubjectCode}) thành công!`);
    closeModal();
}


function changeSemester() {
    const semesterSelect = document.getElementById('semester');
    if (!semesterSelect) return;
    const semester = semesterSelect.value;
    document.querySelectorAll('.semester-content').forEach(content => {
        content.style.display = 'none';
    });
    const selectedSemester = document.getElementById(`semester-${semester}`);
    if (selectedSemester) {
        selectedSemester.style.display = 'block';
    }
}


function createGradeRow(grade) {
    const row = document.createElement('tr');
    const isSubmitted = grade.DiemTong !== null && grade.DiemTong !== undefined;

    row.innerHTML = `
        <td>${grade.TenHocPhan || 'N/A'}</td>
        <td>${grade.MaHP || 'N/A'}</td>
        <td>${getTeacherBySubjectCode(grade.MaHP)}</td>
        <td>${grade.SoTin ?? 'N/A'}</td>
        <td>${grade.HeSoDiem || 'N/A'}</td>
        <td>${grade.DiemQuaTrinh ?? '-'}</td>
        <td>${grade.DiemCuoiKy ?? '-'}</td>
        <td>${grade.DiemTong ?? '-'}</td>
        <td class="grade-${grade.DiemChu?.toLowerCase() || ''}">${grade.DiemChu || '-'}</td>
        <td class="status-${isSubmitted ? 'submitted' : 'pending'}">${isSubmitted ? 'Đã gửi' : 'Chưa gửi'}</td>
        <td><button class="action-btn" onclick="openModal('${grade.TenHocPhan}', '${grade.MaHP}')" ${!isSubmitted ? 'disabled' : ''}>Phúc khảo</button></td>
    `;
    return row;
}


function createSummarySection(grades, semesterName) {
    let totalCredits = 0;
    let totalPoints = 0;

    grades.forEach(grade => {
        const credits = grade.SoTin || 0;
        const gradeScale = mapGradeToScale(grade.DiemChu);
        // Chỉ tính GPA cho các môn có điểm chữ và tín chỉ
        if (grade.DiemChu && credits > 0) {
            totalCredits += credits;
            totalPoints += gradeScale * credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
    let rank = 'N/A';
    if (gpa !== 'N/A') {
        const gpaNum = parseFloat(gpa);
        if (gpaNum >= 3.6) rank = 'Xuất sắc';
        else if (gpaNum >= 3.2) rank = 'Giỏi';
        else if (gpaNum >= 2.5) rank = 'Khá';
        else if (gpaNum >= 2.0) rank = 'Trung bình';
        else rank = 'Yếu';
    }

    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'summary-section';
    summaryDiv.innerHTML = `
        <h3 class="section-title">Tổng kết ${semesterName}</h3>
        <div class="summary-row">
            <div class="summary-label">Tổng số tín chỉ đăng ký (tính GPA):</div>
            <div class="summary-value">${totalCredits}</div>
        </div>
        <div class="summary-row">
            <div class="summary-label">GPA học kỳ:</div>
            <div class="summary-value">${gpa}</div>
        </div>
        <div class="summary-row">
            <div class="summary-label">Xếp loại:</div>
            <div class="summary-value">${rank}</div>
        </div>
    `;
    return summaryDiv;
}

function renderGradeTables(gradesBySemester) {
    const container = document.querySelector('.container'); // Vùng chứa chính
    const semesterSelector = document.querySelector('.semester-selector'); // Dropdown chọn kỳ

    // Xóa các bảng điểm cũ (nếu có)
    document.querySelectorAll('.semester-content').forEach(el => el.remove());

    Object.keys(gradesBySemester).sort().forEach(semesterCode => {
        const grades = gradesBySemester[semesterCode];
        const semesterName = formatSemesterName(semesterCode);

        // Tạo div chứa nội dung kỳ học
        const semesterDiv = document.createElement('div');
        semesterDiv.id = `semester-${semesterCode}`;
        semesterDiv.className = 'semester-content';
        semesterDiv.style.display = 'none'; // Ẩn mặc định

        // Tạo bảng
        const table = document.createElement('table');
        table.className = 'grades-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Tên môn học</th>
                    <th>Mã môn học</th>
                    <th>Giảng viên</th>
                    <th>Số tín</th>
                    <th>Hệ số điểm</th>
                    <th>Điểm quá trình</th>
                    <th>Điểm cuối kỳ</th>
                    <th>Điểm tổng</th>
                    <th>Điểm chữ</th>
                    <th>Trạng thái</th>
                    <th>Phúc khảo</th>
                </tr>
            </thead>
        `;
        const tbody = document.createElement('tbody');
        grades.forEach(grade => {
            tbody.appendChild(createGradeRow(grade));
        });
        table.appendChild(tbody);
        semesterDiv.appendChild(table);

        // Tạo phần tóm tắt
        const summary = createSummarySection(grades, semesterName);
        semesterDiv.appendChild(summary);

        // Thêm div kỳ học vào container (sau dropdown)
        container.insertBefore(semesterDiv, semesterSelector.nextSibling);
    });

    // Sau khi tạo xong, hiển thị kỳ đầu tiên
    changeSemester();
}


function populateSemesterSelector(semesterCodes) {
    const semesterSelect = document.getElementById('semester');
    if (!semesterSelect) return;

    semesterSelect.innerHTML = ''; // Xóa các option cũ
    semesterCodes.sort().forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = code;
        semesterSelect.appendChild(option);
    });
}


const fetchGrades = async (mssv, token) => {
    const container = document.querySelector('.container');
    const semesterSelector = document.querySelector('.semester-selector');

    try {
        const response = await fetch(`/api/grade1/${mssv}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401) throw new Error('Phiên đăng nhập không hợp lệ.');
        if (!response.ok) {
            const errData = await response.json().catch(() => ({ message: `Lỗi ${response.status}` }));
            throw new Error(errData.message || 'Không thể tải dữ liệu điểm.');
        }

        const gradesData = await response.json();

        if (Object.keys(gradesData).length === 0) {
            const noDataMsg = document.createElement('p');
            noDataMsg.textContent = 'Chưa có dữ liệu điểm cho sinh viên này.';
            noDataMsg.style.textAlign = 'center';
            noDataMsg.style.marginTop = '20px';
            container.insertBefore(noDataMsg, semesterSelector.nextSibling);
            semesterSelector.style.display = 'none'; // Ẩn dropdown nếu không có kỳ nào
            return;
        }

        populateSemesterSelector(Object.keys(gradesData));
        renderGradeTables(gradesData);
        semesterSelector.style.display = 'flex'; // Hiển thị dropdown


    } catch (error) {
        console.error('Lỗi khi tải bảng điểm:', error);
        const errorMsg = document.createElement('p');
        errorMsg.textContent = `Lỗi: ${error.message}. Vui lòng thử lại.`;
        errorMsg.style.color = 'red';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.marginTop = '20px';
        container.insertBefore(errorMsg, semesterSelector.nextSibling);
        semesterSelector.style.display = 'none'; // Ẩn dropdown khi có lỗi
    }
};

// --- Script xử lý khi DOM đã tải xong ---
document.addEventListener('DOMContentLoaded', function () {
    // --- Dropdown Logic (Cho mobile) ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
                e.preventDefault();
            }
        });
    });

    // --- Student Info & Grades Fetching Logic ---
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('username');
    const mssv = createMssvFromEmail(email);
    const studentNameEl = document.getElementById('studentName');
    const studentMSSVEl = document.getElementById('studentMSSV');
    const studentClassEl = document.getElementById('studentClass');
    const studentProgramEl = document.getElementById('studentProgram');
    const studentKhoaEl = document.getElementById('studentKhoa');
    const studentCPAEl = document.getElementById('studentCPA');
    const studentInfoDiv = document.getElementById('studentInfoSection');
    const semesterSelect = document.getElementById('semester');

    if (!token || !mssv) {
        console.error('Người dùng chưa đăng nhập hoặc không tìm thấy MSSV.');
        if (studentInfoDiv) studentInfoDiv.innerHTML = '<p style="color: red; grid-column: 1 / -1; text-align: center;">Bạn cần <a href="../DangNhap/DangNhap.html">đăng nhập</a> để xem thông tin này.</p>';
        if (semesterSelect) semesterSelect.parentElement.style.display = 'none'; // Ẩn dropdown
        return;
    }

    const fetchStudentInfo = async () => {
        if (!studentNameEl || !studentMSSVEl || !studentClassEl || !studentProgramEl || !studentKhoaEl || !studentCPAEl || !studentInfoDiv) {
            console.error("Một hoặc nhiều phần tử DOM để hiển thị thông tin sinh viên không được tìm thấy.");
            if (studentInfoDiv) studentInfoDiv.innerHTML = '<p style="color: red; grid-column: 1 / -1; text-align: center;">Lỗi giao diện: Không thể hiển thị thông tin.</p>';
            return;
        }
        try {
            const response = await fetch(`/api/grade/${mssv}`, { // Giả sử đây là API lấy thông tin SV
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                localStorage.removeItem('authToken'); localStorage.removeItem('username');
                throw new Error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: `Lỗi ${response.status}` }));
                throw new Error(errorData.error || 'Không thể tải dữ liệu sinh viên.');
            }

            const data = await response.json();

            if (data) {
                studentNameEl.textContent = data.HoTenSV || 'N/A';
                studentMSSVEl.textContent = data.MSSV || 'N/A';
                studentClassEl.textContent = data.MaLop || 'N/A';
                studentProgramEl.textContent = data.TenChuongTrinh || 'N/A';
                studentKhoaEl.textContent = data.Khoa ? `K${data.Khoa}` : 'N/A';
                studentCPAEl.textContent = data.CPA !== null ? `${data.CPA}/4.0` : 'Chưa có';
            } else {
                throw new Error('Không tìm thấy thông tin sinh viên.');
            }

        } catch (error) {
            console.error('Lỗi khi tải thông tin sinh viên:', error);
            studentInfoDiv.innerHTML = `<p style="color: red; grid-column: 1 / -1; text-align: center;">Lỗi: ${error.message}.</p>`;
        }
    };

    fetchStudentInfo(); // Gọi hàm fetch thông tin SV
    fetchGrades(mssv, token); // Gọi hàm fetch điểm

    // --- Event Listener cho Dropdown Kỳ học ---
    if (semesterSelect) {
        semesterSelect.addEventListener('change', changeSemester);
    }
});

// --- Đóng modal khi click bên ngoài ---
window.onclick = function (event) {
    const modal = document.getElementById('reviewModal');
    if (modal && event.target == modal) {
        closeModal();
    }
}