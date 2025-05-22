const db = require('../config/db');

// Truy vấn dữ liệu từ bảng SinhVien
async function getStudentBasicInfo(username) {
    const [rows] = await db.execute(
        'SELECT MSSV, HoTenSV, DoB, GioiTinh, Email, Tel, K, MaLop FROM SinhVien WHERE Username = ?',
        [username]
    );
    return rows[0];
}

// Truy vấn dữ liệu từ bảng TongKet
// Không có số tín chỉ tích lũy, xếp loại học tập như trong Frontend
async function getStudentAcademicResult(mssv) {
    const [rows] = await db.execute(
        'SELECT CPA, DRL FROM TongKet WHERE mssv = ?',
        [mssv]
    );
    return rows[0];
}

// Truy vấn dữ liệu từ bảng Lop
async function getStudentClass(MaLop) {
    const [rows] = await db.execute(
        'SELECT MaChuongTrinh FROM Lop WHERE MaLop = ?',
        [MaLop]
    );
    return rows[0];
}

// Truy vấn dữ liệu từ bảng ChuongTrinh
async function getStudentLearn(MaChuongTrinh) {
    const [rows] = await db.execute(
        'SELECT TenChuongTrinh, MaTruong FROM ChuongTrinh WHERE MaChuongTrinh = ?',
        [MaChuongTrinh]
    );
    return rows[0];
}

// Truy vấn dữ liệu từ bảng Truong
async function getStudentSchool(MaTruong) {
    const [rows] = await db.execute(
        'SELECT TenTruong FROM Truong WHERE MaTruong = ?',
        [MaTruong]
    );
    return rows[0];
}



module.exports = {
    getStudentBasicInfo,
    getStudentAcademicResult,
    getStudentClass,
    getStudentLearn,
    getStudentSchool
};