function createMssvFromEmail(email) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        console.error("Địa chỉ email không hợp lệ.");
        return null;
    }
    const usernamePart = email.split('@')[0];
    const numberMatch = usernamePart.match(/(\d+)$/);
    return (numberMatch && numberMatch[1]) ? '20' + numberMatch[1] : null;
}

//Kiểm tra tuần học hợp lệ
function isInWeek(weekStr, targetWeek) {
    if (!weekStr) return false;
    const parts = weekStr.split(",");
    for (let part of parts) {
        part = part.trim();
        if (part.includes("-")) {
            const [start, end] = part.split("-").map(Number);
            if (targetWeek >= start && targetWeek <= end) return true;
        } else {
            if (parseInt(part, 10) === targetWeek) return true;
        }
    }
    return false;
}

// Hàm format ngày dd/mm/yyyy
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
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

    //Chọn tuần và nút xem
    function generateWeekOptions(start = 24, end = 42) {
        const select = document.getElementById("week-select");
        if (!select) return;
        select.innerHTML = "";
        for (let i = start; i <= end; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `Tuần ${i}`;
            select.appendChild(option);
        }
        select.value = 28; // giá trị mặc định (có thể thay đổi)
    }
    generateWeekOptions();

    // Cập nhật nội dung "Tuần X"
    function updateWeekLabel(weekNumber) {
        const weekLabel = document.getElementById("current-week-label");
        if (weekLabel) {
            weekLabel.textContent = `Tuần ${weekNumber}`;
        }
    }


    // Chuyển đổi giữa lịch học và lịch thi
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabType = this.getAttribute('data-tab');
            const weekSelect = document.getElementById('week-select');
            const viewBtn = document.getElementById('view-btn');

            if (tabType === 'class') {
                document.getElementById('class-schedule').style.display = 'block';
                document.getElementById('exam-schedule').style.display = 'none';
                if (weekSelect) weekSelect.disabled = false;  // mở khóa dropdown tuần
                if (viewBtn) viewBtn.disabled = false;        // mở khóa nút xem
            } else if (tabType === 'exam') {
                document.getElementById('class-schedule').style.display = 'none';
                document.getElementById('exam-schedule').style.display = 'block';
                if (weekSelect) weekSelect.disabled = true;   // khóa dropdown tuần
                if (viewBtn) viewBtn.disabled = true;         // khóa nút xem
            }
        });
    });

    document.getElementById("view-btn").addEventListener("click", () => {
        const selectedWeek = parseInt(document.getElementById("week-select").value, 10);
        updateWeekLabel(selectedWeek); // Cập nhật "Tuần X"
        fetchSchedule(MSSV, selectedWeek); // gọi lại fetchSchedule với tuần được chọn
    });

    //Mặc định tải lịch học cho tuần 28
    fetchSchedule(MSSV, 28);
    updateWeekLabel(28);

    // Các khung thời gian cố định
    const FIXED_TIME_SLOTS = [
        ["06:45", "07:30"],
        ["07:30", "08:15"],
        ["08:25", "09:10"],
        ["09:20", "10:05"],
        ["10:15", "11:00"],
        ["11:00", "11:45"],
        ["12:30", "13:15"],
        ["13:15", "14:00"],
        ["14:10", "14:55"],
        ["15:05", "15:50"],
        ["16:00", "16:45"],
        ["16:45", "17:30"]
    ];

    const timeSlots = [
        { label: "06:45 - 07:30", start: 6 * 60 + 45, end: 7 * 60 + 30 },
        { label: "07:30 - 08:15", start: 7 * 60 + 30, end: 8 * 60 + 15 },
        { label: "08:25 - 09:10", start: 8 * 60 + 25, end: 9 * 60 + 10 },
        { label: "09:20 - 10:05", start: 9 * 60 + 10, end: 9 * 60 + 55 },
        { label: "10:15 - 11:00", start: 10 * 60 + 5, end: 10 * 60 + 50 },
        { label: "11:00 - 11:45", start: 11 * 60, end: 11 * 60 + 45 },
        { label: "12:30 - 13:15", start: 12 * 60 + 45, end: 13 * 60 + 30 },
        { label: "13:15 - 14:00", start: 13 * 60 + 30, end: 14 * 60 + 15 },
        { label: "14:10 - 14:55", start: 14 * 60 + 25, end: 15 * 60 + 10 },
        { label: "15:05 - 15:50", start: 15 * 60 + 10, end: 15 * 60 + 55 },
        { label: "16:00 - 16:45", start: 16 * 60 + 5, end: 16 * 60 + 50 },
        { label: "16:45 - 17:30", start: 17 * 60, end: 17 * 60 + 45 },
    ];

    function toMinutes(timeStr) {
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
    }

    // Tìm khung giờ phù hợp với thời gian bắt đầu
    function findMatchingSlot(startTimeStr) {
        const [h, m] = startTimeStr.split(":").map(Number);
        const startMinutes = h * 60 + m;

        for (let [startStr, endStr] of FIXED_TIME_SLOTS) {
            const [sh, sm] = startStr.split(":").map(Number);
            const [eh, em] = endStr.split(":").map(Number);
            const slotStart = sh * 60 + sm;
            const slotEnd = eh * 60 + em;

            if (startMinutes >= slotStart && startMinutes < slotEnd) {
                return `${startStr} - ${endStr}`;
            }
        }
        return null;
    }

    async function fetchSchedule(MSSV, weekNumber = null) {
        try {
            const res = await fetch(`/api/lichhoc/${MSSV}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            let data = await res.json();
            if (!Array.isArray(data)) throw new Error('Dữ liệu trả về không hợp lệ');

            // Lọc theo tuần
            if (weekNumber !== null) {
                data = data.filter(item => isInWeek(item.TuanHoc, weekNumber));
            }

            const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
            const timetable = {};

            data.forEach(item => {
                const start = item.ThoiGianBatDau.trim().slice(0, 5); // "06:45"
                const end = item.ThoiGianKetThuc.trim().slice(0, 5); // giả sử dữ liệu có trường này
                const slotLabel = findMatchingSlot(start);
                if (!slotLabel) return;

                if (!timetable[slotLabel]) timetable[slotLabel] = {};

                const dayIndex = parseInt(item.Thu, 10) - 2;
                const day = weekdays[dayIndex];
                if (!day) return;

                timetable[slotLabel][day] = {
                    name: item.TenHP,
                    info: `${item.MaHP} - ${item.MaLopHP}`,
                    room: `Phòng ${item.MaPhong}`,
                    startTime: start,
                    endTime: end
                };
            });

            renderTimetable(timetable);

        } catch (error) {
            console.error("Lỗi khi tải lịch học:", error);
            const tbody = document.getElementById("timetable-body");
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="8" style="color:red; text-align:center;">Không tải được lịch học: ${error.message}</td></tr>`;
            }
        }
    }

    function renderTimetable(timetableData) {
        const tbody = document.getElementById("timetable-body");
        tbody.innerHTML = "";

        const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

        // Dùng để ghi lại các ô đã được render có rowspan để tránh render trùng
        const skipCells = {}; // key: `${slotIndex}-${day}`, value: true nếu cần skip

        // Hàm tiện ích chuyển giờ "HH:mm" sang phút trong ngày
        function toMinutes(timeStr) {
            const [h, m] = timeStr.split(":").map(Number);
            return h * 60 + m;
        }

        for (let slotIndex = 0; slotIndex < timeSlots.length; slotIndex++) {
            const slot = timeSlots[slotIndex];
            const tr = document.createElement("tr");

            // Cột giờ
            const timeTd = document.createElement("td");
            timeTd.className = "time-cell";
            timeTd.textContent = slot.label;
            tr.appendChild(timeTd);

            for (let dayIndex = 0; dayIndex < weekdays.length; dayIndex++) {
                const day = weekdays[dayIndex];
                // Nếu ô này đã bị skip do rowspan ở ô trên rồi thì bỏ qua render
                if (skipCells[`${slotIndex}-${day}`]) {
                    continue;
                }

                const td = document.createElement("td");
                const entry = timetableData[slot.label]?.[day];

                if (entry) {
                    // Tính số slot chiếm dụng dựa trên thời gian thực của môn
                    const startMin = toMinutes(entry.startTime);
                    const endMin = toMinutes(entry.endTime); // cần thêm endTime trong timetableData khi fetch
                    let rowspan = 1;

                    // Tính số slot mà môn học này bao phủ
                    for (let next = slotIndex + 1; next < timeSlots.length; next++) {
                        if (timeSlots[next].start < endMin) {
                            rowspan++;
                        } else {
                            break;
                        }
                    }

                    td.rowSpan = rowspan;
                    td.innerHTML = `
                        <div class="course-item">
                        <div class="course-name">${entry.name}</div>
                        <div class="course-info">${entry.info}</div>
                        <div class="course-location">${entry.room}</div>
                    </div>
                `;
                    td.classList.add("has-class");

                    // Đánh dấu skip các ô con sẽ bị gộp lại
                    for (let r = slotIndex + 1; r < slotIndex + rowspan; r++) {
                        skipCells[`${r}-${day}`] = true;
                    }
                } else {
                    td.innerHTML = "";
                }

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
    }

    // Rút gọn giờ: "06:45:00" → "06:45"
    function formatTime(timeStr) {
        const [h, m] = timeStr.split(":");
        return `${h}:${m}`;
    }

    // Ngăn menu đóng khi click bên trong menu
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });

    // Đóng dropdown khi click bên ngoài
    document.addEventListener('click', function () {
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-menu').classList.remove('active');
        });
    });

    // Lịch thi
    async function loadExamSchedule(mssv) {
        try {
            const response = await fetch(`/api/lichthi/${mssv}`); // 
            if (!response.ok) {
                throw new Error('Lỗi khi lấy dữ liệu lịch thi');
            }
            const data = await response.json();

            const tbody = document.getElementById('exam-timetable-body');
            tbody.innerHTML = ''; // xóa dữ liệu cũ

            data.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.MaHP}</td>
                <td>${item.TenHP}</td>
                <td class="exam-date">${formatDate(item.NgayThi)}</td>
                <td>Kíp ${item.KipThi}</td>
                <td>${item.MaPhongThi}</td>
                <td>Trắc nghiệm/Tự luận</td>
            `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error(error);
            alert('Không thể tải lịch thi: ' + error.message);
        }
    }

    loadExamSchedule(MSSV); // Gọi hàm tải lịch thi khi trang được tải

});
