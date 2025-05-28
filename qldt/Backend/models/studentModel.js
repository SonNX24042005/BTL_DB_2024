const pool = require('../config/dbMySQL');

const getStudentByEmail = async (email) => {
  const sql = `
    SELECT
        sv.HoTenSV AS 'Họ và tên',
        sv.MSSV,
        sv.DoB AS 'Ngày sinh',
        sv.GioiTinh AS 'Giới tính',
        sv.CCCD ,
        sv.SDT,
        sv.Email,
        tr.TenTruong AS 'Trường',
        ct.TenChuongTrinh AS 'Ngành',
        sv.MaLop AS 'Lớp'

    FROM
        SinhVien sv
    JOIN
        Lop l ON sv.MaLop COLLATE utf8mb4_unicode_ci = l.MaLop
    JOIN
        ChuongTrinh ct ON ct.MaChuongTrinh COLLATE utf8mb4_unicode_ci = SUBSTRING_INDEX(l.MaLop, '-K', 1) -- Điều chỉnh nếu cần
    JOIN
        Truong tr ON ct.MaTruong = tr.MaTruong
    WHERE sv.Email = ?`; // Sử dụng parameterized query để tránh SQL Injection

  try {
    const [rows] = await pool.execute(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Ném lỗi để controller xử lý
  }
};

module.exports = {
  getStudentByEmail,
};