const pool = require('../config/dbMySQL');
const getStudentCPA = async (mssv) => {
	// Định nghĩa truy vấn SQL với CTEs
	const sql = `
		WITH StudentGradePoints AS (
			-- Tính điểm số (GradePoint) cho mỗi môn học sinh viên đã học
			SELECT
				bd.MSSV,
				h.TinChiHocTap, -- Số tín chỉ dùng để tính GPA
				-- Chuyển đổi điểm chữ (DiemChu) sang thang điểm 4
				-- Thang điểm này giả định hệ thống chấm điểm phổ biến của HUST. Điều chỉnh nếu thang điểm của trường bạn khác.
				CASE bd.DiemChu
					WHEN 'A+' THEN 4.0
					WHEN 'A'  THEN 3.7
					WHEN 'B+' THEN 3.5
					WHEN 'B'  THEN 3.0
					WHEN 'C+' THEN 2.5
					WHEN 'C'  THEN 2.0
					WHEN 'D+' THEN 1.5
					WHEN 'D'  THEN 1.0
					WHEN 'F'  THEN 0.0
					ELSE NULL -- Các điểm như 'P' (Pass), 'I' (Incomplete), hoặc DiemChu NULL sẽ không đóng góp vào điểm GPA
				END AS GradePoint
			FROM
				bangdiem bd
			JOIN
				hp h ON bd.MaHP = h.MaHP
			WHERE
				h.TinChiHocTap IS NOT NULL AND h.TinChiHocTap > 0 -- Chỉ xét các môn có tín chỉ GPA
				AND bd.DiemChu IS NOT NULL AND bd.DiemChu <> '' -- Đảm bảo DiemChu không rỗng
                AND bd.MSSV = ? -- Lọc theo MSSV ngay từ CTE đầu tiên để tối ưu
		),
		StudentCPA AS (
			-- Tính CPA cho mỗi sinh viên
			SELECT
				MSSV,
				-- CPA = SUM(GradePoint * Tín chỉ) / SUM(Tín chỉ của các môn có điểm)
				SUM(GradePoint * TinChiHocTap) / SUM(CASE WHEN GradePoint IS NOT NULL THEN TinChiHocTap ELSE 0 END) AS CPA
			FROM
				StudentGradePoints
			WHERE GradePoint IS NOT NULL -- Chỉ bao gồm các môn có điểm hợp lệ trong tính toán CPA
			GROUP BY
				MSSV
		)
		-- Lấy thông tin cuối cùng của sinh viên
		SELECT
			s.HoTenSV,
			s.MSSV,
			s.MaLop,
			ct.TenChuongTrinh,
			-- Tính Khóa: 4 chữ số đầu của MSSV trừ đi 1955 (Giả định cách tính khóa)
			(CAST(SUBSTRING(s.MSSV, 1, 4) AS UNSIGNED) - 1955) AS Khoa,
			ROUND(sc.CPA, 2) AS CPA -- Làm tròn CPA đến 2 chữ số thập phân
		FROM
			sinhvien s
		LEFT JOIN
			-- Trích xuất MaChuongTrinh từ MaLop (ví dụ: 'IT-E6' từ 'IT-E6-K68-01')
			-- Giả định MaChuongTrinh là phần trước '-K' trong MaLop
			chuongtrinh ct ON SUBSTRING_INDEX(s.MaLop COLLATE utf8mb4_unicode_ci, '-K', 1) = ct.MaChuongTrinh
		LEFT JOIN
			StudentCPA sc ON s.MSSV = sc.MSSV
		WHERE s.MSSV = ? -- Lọc sinh viên theo MSSV
		ORDER BY
			s.MSSV;
	`;

	try {
		// Thực thi truy vấn với tham số MSSV
        // Cần truyền MSSV hai lần vì nó xuất hiện hai lần trong truy vấn (trong CTE và WHERE cuối)
		const [rows] = await pool.execute(sql, [mssv, mssv]);
		// Trả về dòng đầu tiên (vì chỉ truy vấn một sinh viên) hoặc null nếu không có kết quả
		return rows[0] || null;
	} catch (error) {
		// Ghi log lỗi và ném lỗi ra ngoài để xử lý ở tầng cao hơn
		console.error("Error executing getStudentCPA query:", error);
		throw error;
	}
};

// Xuất hàm để có thể sử dụng ở các module khác
module.exports = {
	getStudentCPA,
};