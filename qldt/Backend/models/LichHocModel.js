const pool = require('../config/dbMySQL');

// Lấy lịch học theo MSSV
const getSchedule = async (MSSV) => {
    const sql = `
        SELECT lhp.MaHP, lh.MaLopHP, hp.TenHP, lhp.ThoiGianBatDau, lhp.ThoiGianKetThuc, lhp.MaPhong, lhp.Thu, lhp.TuanHoc
        FROM lichhoc lh
        JOIN lophocphan lhp ON lh.MaLopHP = lhp.MaLopHP
        JOIN hp ON hp.MaHP = lhp.MaHP
        WHERE lh.MSSV = ?;
    `;

    try {
        const [rows] = await pool.execute(sql, [MSSV]);

        if (rows.length === 0) {
            throw new Error('Không tìm thấy lịch học phù hợp');
        }

        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin lịch học: ' + error.message);
    }
};

// Lấy lịch thi theo MSSV
const getExamSchedule = async (MSSV) => {
    const sql = `
        SELECT lhp.MaHP, hp.TenHP, lpt.NgayThi, lpt.KipThi, lpt.MaPhongThi
        FROM lichthi lt
        JOIN lopthi lpt ON lt.MaLopThi = lpt.MaLopThi
        JOIN lichhoc lh ON lh.MaLopHP = lt.MaLopHP
        JOIN lophocphan lhp ON lh.MaLopHP = lhp.MaLopHP
        JOIN hp ON lhp.MaHP = hp.MaHP
        WHERE lh.MSSV = ?
        ORDER BY lpt.NgayThi, CAST(SUBSTRING(lpt.KipThi, 5) AS UNSIGNED);
    `;

    try {
        const [rows] = await pool.execute(sql, [MSSV]);

        if (rows.length === 0) {
            throw new Error('Không tìm thấy lịch thi phù hợp');
        }
        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin lịch thi: ' + error.message);
    }
};

module.exports = {
    getSchedule,
    getExamSchedule
}