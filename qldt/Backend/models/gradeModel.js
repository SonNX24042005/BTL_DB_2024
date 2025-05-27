// File: models/KetQuaHocTapModel.js (phiên bản trả về Promise)

const db = require('../config/dbMySQL1'); // Đảm bảo đường dẫn này chính xác

const getProgram = {
  /**
   * Lấy chi tiết kết quả học tập của một sinh viên dựa trên MSSV.
   * @param {string} mssv - Mã số sinh viên
   * @returns {Promise<Array>} - Promise trả về một mảng các kết quả học tập
   */
  getByMssv: (mssv) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
            bd.MaHP,
            h.TenHP,
            nhp.TenNhomHP,
            bd.HocKy,
            h.TinChiHocTap,
            h.TinChiHocPhi,
            bd.DiemChu,
            bd.DiemSo
        FROM
            bangdiem bd
        JOIN
            hp h ON bd.MaHP = h.MaHP
        LEFT JOIN
            nhomhocphan nhp ON h.MaNhomHP = nhp.MaNhomHP
        WHERE
            bd.MSSV = ?
        ORDER BY
            bd.HocKy, bd.MaHP;
      `;
      db.query(query, [mssv], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  // Bạn có thể thêm các phương thức khác tại đây
};

// console.log('✅ KetQuaHocTapModel loaded (Promise version)');
module.exports = getProgram;