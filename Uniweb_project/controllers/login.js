const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config') // Kết nối database trên máy chủ SQL
const db = require('mssql') // Kết nối database trên SQL Server
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const Login = async (req, res) => {

    //Lấy thông tin từ form người dùng đã nhập (gửi lên server)
    const { username, password } = req.body

    // Kiểm tra nếu chưa nhập tên người dùng
    if (!username || username.trim() === "") {
        return res.status(401).json({ message: 'Vui lòng nhập tên người dùng' });
    }

    // Tạo request mới
    const request = new sql.Request();

    //Thử chạy một khối mã bất đồng bộ có thể xảy ra lỗi
    try {
        await sql.connect(config);

        //Truy vấn dữ liệu username trong database
        const result = await request.query(`SELECT * FROM Users WHERE username = '${username}'`);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
        }

        const user = result.recordset[0];

        if (!password || password.trim() === "" || user.password.length === 0) {
            return res.status(401).json({ message: 'Vui lòng nhập mật khẩu' });
        }

        const Match = await bcrypt.compare(password, user.password);

        if (!Match) {
            return res.status(401).json({ message: 'Mật khẩu không đúng' })
        }

        else {
            // Chuyển hướng đến trang chủ (/home) nếu đúng tên đăng nhập và mật khẩu 
            const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return res.json({ message: "Đăng nhập thành công", token, redirect: "/home" });
        }

    }

    // Xử lý lỗi (nếu có)
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    finally {
        // Đóng kết nối với database
        sql.close();
    }
};

module.exports = Login