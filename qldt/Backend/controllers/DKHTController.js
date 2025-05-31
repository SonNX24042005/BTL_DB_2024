// controllers/monhocController.js
const { CourseNameByMaHP, viewSemester, submitRegister, viewRegisteredCourses, deleteRegisteredCourse } = require('../models/DKHTModel');

async function ThemMonHoc(req, res) {
    const maHP = req.params.MaHP; // Lấy từ URL thay vì body
    try {
        const monHocInfo = await CourseNameByMaHP(maHP);
        if (!monHocInfo) {
            return res.status(404).json({ message: "Môn học không tồn tại" });
        }
        res.json(monHocInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
}

async function ChonKyHoc(req, res) {
    try {
        const semesters = await viewSemester();
        if (semesters.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy kỳ học" });
        }
        res.json(semesters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
}

async function DangKyHocTap(req, res) {
    const { courses } = req.body;
    const { mssv } = req.params;

    try {
        for (const course of courses) {
            try {
                const success = await submitRegister(mssv, course.MaHP, course.MaKyHoc);
                if (!success) {
                    return res.status(500).json({
                        success: false,
                        message: `Không thể đăng ký môn ${course.MaHP}`
                    });
                }
            } catch (innerErr) {
                // In lỗi từ model
                console.error("Lỗi khi đăng ký từng môn:", innerErr.message);
                return res.status(400).json({
                    success: false,
                    message: innerErr.message // Gửi lỗi chi tiết từ model
                });
            }
        }

        return res.json({ success: true });

    } catch (err) {
        console.error("Lỗi controller:", err.message);
        res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
    }
}


async function LayMonHocDaDangKy(req, res) {

    const { mssv } = req.params;

    try {
        const registeredCourses = await viewRegisteredCourses(mssv);
        if (registeredCourses.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy môn học đã đăng ký" });
        }
        res.json(registeredCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
}

async function XoaMonHocDaDangKy(req, res) {
    const { courses } = req.body;
    const { mssv } = req.params;

    try {
        for (const course of courses) {
            try {
                const success = await deleteRegisteredCourse(mssv, course.MaHP, course.MaKyHoc);
                if (!success) {
                    return res.status(500).json({
                        success: false,
                        message: `Không thể xóa môn ${course.MaHP}`
                    });
                }
            } catch (innerErr) {
                console.error("Lỗi khi xóa từng môn:", innerErr.message);
                return res.status(400).json({
                    success: false,
                    message: innerErr.message
                });
            }
        }

        return res.json({ success: true, message: 'Xóa môn học đã đăng ký thành công' });

    } catch (err) {
        console.error("Lỗi controller:", err.message);
        res.status(500).json({ success: false, message: "Lỗi server: " + err.message });
    }
}


module.exports = {
    ThemMonHoc,
    ChonKyHoc,
    DangKyHocTap,
    LayMonHocDaDangKy,
    XoaMonHocDaDangKy
};
