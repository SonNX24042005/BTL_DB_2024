const gradeModel = require('../models/gradeModel'); // Đảm bảo đường dẫn này chính xác

const getStudentCPA = async (req, res) => {
	try {
		const { mssv } = req.params; // Lấy MSSV từ parameters của URL

		if (!mssv) {
			return res.status(400).json({ error: "Vui lòng cung cấp MSSV." });
		}

		const cpaData = await gradeModel.getStudentCPA(mssv);

		if (!cpaData) {
			return res.status(404).json({ error: "Không tìm thấy thông tin sinh viên hoặc CPA." });
		}

		res.status(200).json(cpaData);
	} catch (error) {
		console.error("Error in getStudentCPA controller:", error);
		res.status(500).json({ error: "Lỗi máy chủ nội bộ khi lấy thông tin CPA." });
	}
};

module.exports = {
	getStudentCPA,
};