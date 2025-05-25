const db = require('../config/dbMySQL1');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM TaiKhoan', callback);
  },

  getById: (Username, callback) => {
    db.query('SELECT * FROM TaiKhoan WHERE Username = ?', [Username], callback);
  },

  create: (Username,MatKhau, callback) => {
    db.query('INSERT INTO TaiKhoan (Username, MatKhau) VALUES (?, ?)', [Username, MatKhau], callback);
  }
};
console.log('✅ done model');
module.exports = User;
