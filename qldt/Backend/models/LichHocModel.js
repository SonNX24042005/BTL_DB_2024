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
        SELECT 
        FROM 
        WHERE;
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