const pool = require('../config/dbMySQL');

const totalCredit = async (mssv) => {
    const sql = `
        SELECT SUM(h.TinChiHocTap) AS TongSoTin
        FROM
            hp h
        JOIN
            bangdiem bd ON bd.MaHP = h.MaHP
        WHERE
            bd.MSSV = ?
    `;
    try {
        const [rows] = await pool.execute(sql, [mssv]);
        return rows;
    } catch (error) {
        console.error("Lỗi khi truy vấn danh sách học phần:", error);
        throw error;
    }
};

module.exports = {
    totalCredit
};