const studentModel = require('../models/studentInfoModel');

async function getStudentFullInfo(req, res) {
    const username = req.session?.username || req.body?.username || req.query?.username;

    if (!username) {
        return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    try {
        const basicInfo = await studentModel.getStudentBasicInfo(username);
        if (!basicInfo) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });

        const { MSSV, HoTenSV, DoB, Email, K, MaLop } = basicInfo;

        const academic = await studentModel.getStudentAcademicResult(MSSV);
        const classInfo = await studentModel.getStudentClass(MaLop);
        const programInfo = await studentModel.getStudentLearn(classInfo.MaChuongTrinh);
        const schoolInfo = await studentModel.getStudentSchool(programInfo.MaTruong);

        res.json({
            MSSV,
            HoTenSV,
            DoB,
            Email,
            K,
            CPA: academic[0]?.CPA || null,
            DRL: academic[0]?.DRL || null,
            TenChuongTrinh: programInfo.TenChuongTrinh,
            TenTruong: schoolInfo.TenTruong
        });
    } catch (error) {
        console.error('Lỗi lấy thông tin sinh viên:', error);
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
}

module.exports = {
    getStudentFullInfo,
};
