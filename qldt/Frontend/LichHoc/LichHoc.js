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
            // Bỏ class 'active' khỏi tất cả tab
            tabs.forEach(t => t.classList.remove('active'));
            // Thêm class 'active' cho tab được chọn
            this.classList.add('active');

            // Xác định tab đang chọn
            const tabType = this.getAttribute('data-tab');
            if (tabType === 'class') {
                document.getElementById('class-schedule').style.display = 'block';
                document.getElementById('exam-schedule').style.display = 'none';
            } else {
                document.getElementById('class-schedule').style.display = 'none';
                document.getElementById('exam-schedule').style.display = 'block';
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

    async function fetchSchedule(MSSV, weekNumber = null) {
        try {
            const res = await fetch(`/api/lichhoc/${MSSV}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            let data = await res.json();
            if (!Array.isArray(data)) throw new Error('Dữ liệu trả về không hợp lệ');

            // Lọc data chỉ lấy môn học có trong tuần được chọn
            if (weekNumber !== null) {
                data = data.filter(item => isInWeek(item.TuanHoc, weekNumber));
            }

            const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
            const groupByStart = {};

            // Gom nhóm theo giờ bắt đầu
            data.forEach(item => {
                const start = item.ThoiGianBatDau.trim();
                const end = item.ThoiGianKetThuc.trim();
                if (!groupByStart[start]) groupByStart[start] = [];
                groupByStart[start].push({ ...item, end });
            });

            // Tạo bảng timetable: key = "start - max(end)", value = { Thứ: môn học }
            const timetable = {};
            for (const start in groupByStart) {
                const items = groupByStart[start];

                // Lấy giờ kết thúc trễ nhất
                const maxEnd = items.reduce((latest, curr) => curr.end > latest ? curr.end : latest, "00:00:00");
                const timeLabel = formatTimeRange(start, maxEnd);

                timetable[timeLabel] = timetable[timeLabel] || {};
                items.forEach(item => {
                    const dayIndex = parseInt(item.Thu, 10) - 2;
                    const day = (dayIndex >= 0 && dayIndex < weekdays.length) ? weekdays[dayIndex] : null;
                    if (!day) return;

                    timetable[timeLabel][day] = {
                        name: item.TenHP,
                        info: `${item.MaHP} - ${item.MaLopHP}`,
                        room: `Phòng ${item.MaPhong}`,
                        startTime: start
                    };
                });
            }

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

        // Tạo mảng từ timetableData và sắp xếp theo startTime
        const timetableArray = Object.entries(timetableData).map(([timeLabel, entry]) => {
            const startTime = Object.values(entry)[0]?.startTime || "00:00:00";
            return { timeLabel, entry, startTime };
        }).sort((a, b) => a.startTime.localeCompare(b.startTime));

        // Tạo bảng
        timetableArray.forEach(({ timeLabel, entry }) => {
            const tr = document.createElement("tr");

            const timeTd = document.createElement("td");
            timeTd.className = "time-cell";
            timeTd.textContent = timeLabel;
            tr.appendChild(timeTd);

            weekdays.forEach(day => {
                const td = document.createElement("td");
                const course = entry[day];
                if (course) {
                    td.innerHTML = `
                    <div class="course-item">
                        <div class="course-name">${course.name}</div>
                        <div class="course-info">${course.info}</div>
                        <div class="course-location">${course.room}</div>
                    </div>
                `;
                }
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    }

    // Rút gọn giờ: "06:45:00" → "06:45"
    function formatTime(timeStr) {
        const [h, m] = timeStr.split(":");
        return `${h}:${m}`;
    }

    // Trả về chuỗi "06:45 - 10:05"
    function formatTimeRange(start, end) {
        return `${formatTime(start)} - ${formatTime(end)}`;
    }


});
