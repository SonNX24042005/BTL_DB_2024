// config/dbMySQL.js
const mysql = require('mysql2/promise'); // Đảm bảo dùng /promise
// require('dotenv').config(); // Nếu bạn dùng .env, nếu không thì bỏ qua

const connection = mysql.createPool({
  host: process.env.DB_HOST_MYSQL || 'localhost', // Ưu tiên dùng .env, nếu không có thì dùng 'localhost'
  port: process.env.DB_PORT_MYSQL || 3306,     // Ưu tiên dùng .env, nếu không có thì dùng 3306
  user: process.env.DB_USER_MYSQL || 'root',     // Ưu tiên dùng .env, nếu không có thì dùng 'root'
  password: process.env.DB_PASSWORD_MYSQL || 'clear', // Ưu tiên dùng .env, nếu không có thì dùng 'root'
  database: process.env.DB_NAME_MYSQL || 'QLDT',   // Ưu tiên dùng .env, nếu không có thì dùng 'QLDT'
  waitForConnections: true,
  connectionLimit: 10, // Số kết nối tối đa trong pool
  queueLimit: 0,
  charset: 'utf8mb4'
});

console.log("✅ MySQL Connection Pool đã được tạo thành công.");

// Export đối tượng pool này
module.exports = connection;