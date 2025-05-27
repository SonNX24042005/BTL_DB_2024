// File: controllers/KetQuaHocTapController.js

const programModel = require('../models/gradeModel'); // Đường dẫn tới model của bạn

/**
 * Controller để lấy chi tiết kết quả học tập của sinh viên theo MSSV.
 */
const getProgramByMssv = async (req, res) => {
  try {
    const { mssv } = req.params; // Lấy MSSV từ URL parameter (ví dụ: /api/ketquahoctap/:mssv)

    if (!mssv) {
      return res.status(400).json({ message: 'MSSV is required' });
    }

    // Gọi phương thức từ model (đã trả về Promise)
    const ketQuaHocTap = await programModel.getByMssv(mssv);

    // Truy vấn trả về một mảng. Nếu không có kết quả, mảng sẽ rỗng.
    if (ketQuaHocTap && ketQuaHocTap.length > 0) {
      res.status(200).json(ketQuaHocTap);
    } else {
      // Trường hợp MSSV không tồn tại trong bảng điểm hoặc sinh viên chưa có điểm
      res.status(404).json({ message: 'No academic records found for the provided MSSV.' });
    }
  } catch (error) {
    console.error("Controller Error (getKetQuaHocTapByMssv):", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getProgramByMssv: getProgramByMssv,
  // Thêm các controller functions khác tại đây nếu cần
};