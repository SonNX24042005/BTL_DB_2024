const pool = require('../config/dbMySQL');

const getGradesBySemester = async (mssv) => {
    const sql = `
        SELECT
            h.TenHP AS TenHocPhan,
            bd.MaHP AS MaHP,
            h.TinChiHocTap AS SoTin,
            h.HeSoGK AS HeSoDiem,
            bd.DiemGK AS DiemQuaTrinh,
            bd.DiemCK AS DiemCuoiKy,
            bd.DiemSo AS DiemTong,
            bd.DiemChu AS DiemChu,
            bd.HocKy AS KyHoc
        FROM
            bangdiem bd
        JOIN
            hp h ON bd.MaHP = h.MaHP
        WHERE
            bd.MSSV = ?
        ORDER BY
            bd.HocKy, h.TenHP;
    `;
    try {
        // Thực thi câu lệnh SQL
        const result = await pool.execute(sql, [mssv]);

        // Kiểm tra xem 'result' có được định nghĩa và là một mảng hay không
        if (!result || !Array.isArray(result) || result.length === 0) {
            console.error("Kết quả không mong đợi từ pool.execute:", result);
            throw new Error("Không thể thực thi truy vấn cơ sở dữ liệu hoặc nhận được kết quả không mong đợi.");
        }

        // result[0] chứa các hàng dữ liệu. Nó phải là một mảng.
        const rows = result[0];

        // Kiểm tra xem 'rows' có phải là một mảng không. Nó có thể rỗng, nhưng phải là mảng.
        if (!Array.isArray(rows)) {
            console.error("Mong đợi rows là một mảng, nhưng nhận được:", rows);
            throw new Error("Định dạng kết quả truy vấn cơ sở dữ liệu không chính xác.");
        }

        return rows; // Trả về mảng các hàng (có thể rỗng)

    } catch (error) {
        // Kiểm tra xem lỗi có phải là 'is not iterable' hay không, điều này có thể chỉ ra sự cố cấu hình.
        if (error instanceof TypeError && error.message.includes("is not iterable")) {
            console.error("Phát hiện lỗi 'is not iterable'. Điều này thường có nghĩa là 'pool.execute' không trả về promise hoặc 'pool' không được cấu hình với 'mysql2/promise'.", error);
            throw new Error("Lỗi cấu hình cơ sở dữ liệu hoặc thực thi truy vấn. Đảm bảo 'mysql2/promise' được sử dụng.", { cause: error });
        }
        console.error("Lỗi khi thực thi truy vấn getGradesBySemester:", error);
        throw error; // Ném lại lỗi để controller xử lý
    }
};

module.exports = {
    getGradesBySemester,
};