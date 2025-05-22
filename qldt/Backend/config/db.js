const mysql = require('mysql2/promise');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const pool = mysql.createPool({
    host: '192.168.1.120',
    user: 'tyn275',
    password: 'tyn27536@',
    database: 'qldt',
    port: 3306, // Cổng mặc định của MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;