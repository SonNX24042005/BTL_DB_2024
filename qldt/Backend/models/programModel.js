const pool = require('../config/dbMySQL');

const getStudentProgramWithGrades = async (mssv) => {
	const sql = `
		SELECT
			ctdt.MaHP AS MaHP,
			h.TenHP AS TenHocPhan,
			ctdt.KyHocKhuyenNghi AS KyHoc, 
			h.TinChiHocTap AS TC,
			h.TinChiHocPhi AS TCHocPhi,
			bd.DiemChu AS DiemChu,
			bd.DiemSo AS DiemSo,
			nhp.TenNhomHP AS TenNhomHP
		FROM
			SinhVien sv
		JOIN
			Lop l ON sv.MaLop COLLATE utf8mb4_unicode_ci = l.MaLop 
		JOIN
			ChuongTrinhDaoTao ctdt ON ctdt.MaChuongTrinh COLLATE utf8mb4_unicode_ci = SUBSTRING_INDEX(l.MaLop, '-K', 1)
		JOIN
			hp h ON ctdt.MaHP = h.MaHP
		LEFT JOIN
			bangdiem bd ON sv.MSSV = bd.MSSV AND ctdt.MaHP = bd.MaHP
		LEFT JOIN
			nhomhocphan nhp ON h.MaNhomHP = nhp.MaNhomHP
		WHERE
			sv.MSSV = ?
		ORDER BY
			-- Sắp xếp theo Kỳ học khuyến nghị
			-- Xử lý trường hợp KyHocKhuyenNghi có thể là NULL hoặc chứa nhiều giá trị (vd: "3,4,0410")
			LPAD(SUBSTRING_INDEX(COALESCE(ctdt.KyHocKhuyenNghi, '0'), ',', 1), 10, '0'), 
			ctdt.KyHocKhuyenNghi, -- Sắp xếp phụ theo chuỗi đầy đủ để ổn định
			h.MaHP;
	`;
	try {
		const [rows] = await pool.execute(sql, [mssv]);
		return rows;
	} catch (error) {
		console.error("Error executing getStudentProgramWithGrades query:", error);
		throw error;
	}
};

module.exports = {
	getStudentProgramWithGrades,
};