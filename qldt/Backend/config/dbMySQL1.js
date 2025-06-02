
const mysql = require('mysql2'); // Đảm bảo dùng /promise


const connection = mysql.createPool({
  host: process.env.DB_HOST_MYSQL || 'localhost',
  port: process.env.DB_PORT_MYSQL || 3306,
  user: process.env.DB_USER_MYSQL || 'root',
  password: process.env.DB_PASSWORD_MYSQL || 'root',
  database: process.env.DB_NAME_MYSQL || 'QLDT',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

console.log("✅ MySQL Connection Pool đã được tạo thành công.");


module.exports = connection;