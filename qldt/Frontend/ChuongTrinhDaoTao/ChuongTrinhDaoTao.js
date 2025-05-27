/**
 * Trích xuất và tạo MSSV từ email theo quy tắc.
 * @param {string} email - Địa chỉ email của sinh viên.
 * @returns {string|null} - MSSV được tạo hoặc null nếu email không hợp lệ.
 */
function createMssvFromEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    console.error("Địa chỉ email không hợp lệ.");
    return null;
  }
  const usernamePart = email.split('@')[0];
  const numberMatch = usernamePart.match(/(\d+)$/);
  return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('username');
    let user = null;
    let mssv = null;
    let email = null;

    if (userData) {
        try {
            user = JSON.parse(userData);
            mssv = user ? user.MSSV : null;
            email = user ? user.email : null;
        } catch (e) {
            email = userData;
            user = { email: email };
        }
    }

    if (email && !mssv) {
        mssv = createMssvFromEmail(email);
        if (user && mssv) user.MSSV = mssv;
    }

    if (!token || !mssv) {
        console.error('Không tìm thấy token hoặc không thể xác định MSSV.');
        alert('Bạn chưa đăng nhập hoặc thông tin không hợp lệ. Vui lòng đăng nhập lại.');
        window.location.href = '../DangNhap/DangNhap.html';
        return;
    }

    fetchAndRenderProgramData(mssv, token);
});

async function fetchAndRenderProgramData(mssv, token) {
    const apiUrl = `http://localhost:3000/api/student/${mssv}/curriculum`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            window.location.href = '../DangNhap/DangNhap.html';
            return;
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Lỗi ${response.status}.`);
        }

        const programData = await response.json();
        renderProgramCurriculum(programData);

    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
        const container = document.querySelector('.container');
        // Đảm bảo chỉ có #main-content bị ảnh hưởng
        const mainContent = document.getElementById('main-content') || container;
        mainContent.innerHTML = `<h1>Chương trình đào tạo sinh viên</h1>
                                 <p style="color: red; text-align: center; font-weight: bold;">
                                     Lỗi tải dữ liệu: ${error.message}
                                 </p>`;
    }
}

function renderProgramCurriculum(courses) {
    const container = document.querySelector('.container');
    const mainContent = document.getElementById('main-content');
    const h1 = mainContent.querySelector('h1'); // Lấy H1 từ main-content

    // Xóa nội dung cũ của main-content (trừ H1)
    mainContent.innerHTML = '';
    mainContent.appendChild(h1);

    // Xóa summary cũ nếu có
    const oldSummary = container.querySelector('.summary');
    if (oldSummary) {
        container.removeChild(oldSummary);
    }


    if (!courses || courses.length === 0) {
        mainContent.innerHTML += '<p>Không có dữ liệu chương trình đào tạo.</p>';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>Mã HP</th>
            <th>Tên học phần</th>
            <th>Kỳ học</th>
            <th>TC</th>
            <th>TC học phí</th>
            <th>Điểm chữ</th>
            <th>Điểm số</th>
        </tr>
    `;

    table.appendChild(thead);
    table.appendChild(tbody);
    mainContent.appendChild(table); // Thêm bảng vào #main-content

    const groupedCourses = courses.reduce((acc, course) => {
        const groupName = course.NhómHP || 'Khác';
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(course);
        return acc;
    }, {});

    let totalCreditsEarned = 0;
    let totalProgramCredits = 0;

    for (const groupName in groupedCourses) {
        const groupData = renderCourseGroup(tbody, groupName, groupedCourses[groupName]);
        totalCreditsEarned += groupData.earned;
        totalProgramCredits += groupData.total;
    }

    // Thêm summary vào .container (để nó thành flex item thứ 2)
    renderSummary(container, totalCreditsEarned, totalProgramCredits);
}

function renderCourseGroup(tbody, groupName, coursesInGroup) {
    let groupCreditsEarned = 0;
    let groupTotalCredits = 0;

    const categoryHeaderRow = document.createElement('tr');
    categoryHeaderRow.innerHTML = `
        <td colspan="7" class="category-header">
            ${groupName} (${coursesInGroup.reduce((sum, c) => sum + (Number(c['TC']) || 0), 0)} TC)
        </td>
    `;
    tbody.appendChild(categoryHeaderRow);

    coursesInGroup.forEach(course => {
        const tr = document.createElement('tr');
        const tc = Number(course['TC']) || 0;
        const grade = course['Điểm chữ'];
        const gradeScore = course['Điểm số'];
        let displayScore = '-';
        if (gradeScore !== null && gradeScore !== undefined) {
            const numScore = parseFloat(gradeScore);
            displayScore = !isNaN(numScore) ? numScore.toFixed(1) : (gradeScore || '-');
        }

        tr.innerHTML = `
            <td>${course['Mã HP'] || '-'}</td>
            <td>${course['Tên học phần'] || '-'}</td>
            <td>${course['Kỳ học'] || '-'}</td>
            <td>${tc}</td>
            <td>${course['TC học phí'] || '-'}</td>
            <td>${grade || '-'}</td>
            <td>${displayScore}</td>
        `;

        if (grade) {
            if (grade.startsWith('A')) tr.className = 'grade-a';
            else if (grade.startsWith('B')) tr.className = 'grade-b';
            else if (grade.startsWith('C')) tr.className = 'grade-c';
            else if (grade.startsWith('D')) tr.className = 'grade-d';
            else if (grade === 'F') tr.className = 'grade-f';
            else tr.className = 'not-taken';
        } else {
            tr.className = 'not-taken';
        }

        tbody.appendChild(tr);

        groupTotalCredits += tc;
        if (grade && grade !== '-' && grade !== 'F' && tc > 0) {
            groupCreditsEarned += tc;
        }
    });

    const creditSumRow = document.createElement('tr');
    creditSumRow.innerHTML = `
        <td colspan="7" class="credit-sum">
            Tổng TC đạt: ${groupCreditsEarned}/${groupTotalCredits}
        </td>
    `;
    tbody.appendChild(creditSumRow);

    return { earned: groupCreditsEarned, total: groupTotalCredits };
}

/**
 * Hiển thị phần tóm tắt tổng kết tín chỉ.
 * @param {HTMLElement} container - Element .container để chèn vào.
 * @param {number} totalEarned - Tổng số tín chỉ đã đạt.
 * @param {number} totalProgram - Tổng số tín chỉ của chương trình.
 */
function renderSummary(container, totalEarned, totalProgram) {
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'summary'; // Chỉ đặt class

    summaryDiv.innerHTML = `
        <h3>Tổng kết</h3>
        <p><strong>Tổng số tín chỉ đạt được:</strong> ${totalEarned} TC</p>
        <p><strong>Tổng số tín chỉ còn phải hoàn thành:</strong> ${totalProgram - totalEarned} TC</p>
        <p><strong>Tổng số tín chỉ chương trình:</strong> ${totalProgram} TC</p>
    `;
    // Thêm summary vào .container để nó là flex item
    container.appendChild(summaryDiv);
}