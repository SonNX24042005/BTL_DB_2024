const programModel = require('../models/programModel'); 

const handleGetStudentProgramDetails = async (req, res) => {
	try {
		const { mssv } = req.params;
		if (!mssv) {
			return res.status(400).json({ message: "Mã số sinh viên (MSSV) là bắt buộc." });
		}

		const programDetails = await programModel.getStudentProgramWithGrades(mssv);

		if (programDetails && programDetails.length > 0) {
			const formattedProgramDetails = programDetails.map(course => ({
				"Mã HP": course.MaHP,
				"Tên học phần": course.TenHocPhan,
				"Kỳ học": course.KyHoc, 
				"TC": course.TC,
				"TC học phí": course.TCHocPhi,
				"Điểm chữ": course.DiemChu,
				"Điểm số": course.DiemSo,
				"NhómHP": course.TenNhomHP
			}));
			res.status(200).json(formattedProgramDetails);
		} else {
			res.status(404).json({ message: `Không tìm thấy thông tin chương trình đào tạo cho sinh viên có MSSV: ${mssv}. Vui lòng kiểm tra lại MSSV hoặc cấu trúc dữ liệu chương trình.` });
		}
		} catch (error) {
			console.error('Lỗi trong programController (handleGetStudentProgramDetails):', error);
			res.status(500).json({ message: "Lỗi khi lấy thông tin chương trình đào tạo của sinh viên.", error: error.message });
		}
};

module.exports = {
	handleGetStudentProgramDetails,
};