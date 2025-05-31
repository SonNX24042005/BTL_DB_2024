const pool = require('../config/dbMySQL');

// Lấy tên môn học theo mã học phần
const CourseNameByMaHP = async (maHP) => {
    const sqlMonHoc = `
        SELECT DISTINCT h.MaHP, h.TenHP
        FROM hp h
        WHERE h.MaHP = ?;
    `;

    try {
        const [monHocRows] = await pool.execute(sqlMonHoc, [maHP]);

        if (monHocRows.length === 0) {
            throw new Error('Không tìm thấy môn học với mã học phần: ' + maHP);
        }

        return {
            maHP: monHocRows[0].MaHP,
            tenHP: monHocRows[0].TenHP,
            hinhThuc: "Online",
            trangThai: "Chưa đăng ký"
        };
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin môn học: ' + error.message);
    }
};

//Hiển thị những học kỳ trong dropbox
const viewSemester = async () => {
    const sql = `
        SELECT DISTINCT MaKyHoc
        FROM kyhoc
        ORDER BY MaKyHoc DESC LIMIT 4; 
    `;
    try {
        const [rows] = await pool.execute(sql);

        if (rows.length === 0) {
            throw new Error('Không tìm thấy học kỳ nào.');
        }

        return rows.map(row => row.MaKyHoc);
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách học kỳ: ' + error.message);
    }
}

// Đăng ký học phần
const submitRegister = async (MSSV, MaHP, MaKyHoc) => {
    const checkSql = `
        SELECT * FROM dangkyhocphan 
        WHERE MSSV = ? AND MaHP = ? AND MaKyHoc = ?;
    `;
    const insertSql = `
        INSERT INTO dangkyhocphan (MSSV, MaHP, MaKyHoc)
        VALUES (?, ?, ?);
    `;
    try {
        const [existing] = await pool.execute(checkSql, [MSSV, MaHP, MaKyHoc]);
        if (existing.length > 0) {
            throw new Error('Học phần này đã được đăng ký trong kỳ học hiện tại.');
        }

        const [result] = await pool.execute(insertSql, [MSSV, MaHP, MaKyHoc]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Lỗi khi đăng ký học phần: ' + error.message);
    }
};

//Hiện thị những học phần đã đăng ký
const viewRegisteredCourses = async (MSSV) => {
    const sql = `
        SELECT dkhp.MaHP, dkhp.MaKyHoc, h.TenHP
        FROM dangkyhocphan dkhp
        JOIN hp h ON dkhp.MaHP = h.MaHP
        WHERE dkhp.MSSV = ?;
    `
    try {
        const [rows] = await pool.execute(sql, [MSSV]);

        if (rows.length === 0) {
            throw new Error('Không tìm thấy môn sinh viên đã đăng ký: ' + MSSV);
        }

        return rows.map(row => ({
            maHP: row.MaHP,
            tenHP: row.TenHP,
            hinhThuc: "Online",
            kyHoc: row.MaKyHoc,
            trangThai: "Đã đăng ký"
        }));

    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin đăng ký: ' + error.message);
    }
}

//Xóa học phần đã đăng ký
const deleteRegisteredCourse = async (MSSV, MaHP, MaKyHoc) => {
    const sql = `
        DELETE FROM dangkyhocphan 
        WHERE MSSV = ? AND MaHP = ? AND MaKyHoc = ?;
    `;
    try {
        const [result] = await pool.execute(sql, [MSSV, MaHP, MaKyHoc]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Lỗi khi xóa học phần đã đăng ký: ' + error.message);
    }
};

module.exports = {
    CourseNameByMaHP,
    viewSemester,
    submitRegister,
    viewRegisteredCourses,
    deleteRegisteredCourse
};
