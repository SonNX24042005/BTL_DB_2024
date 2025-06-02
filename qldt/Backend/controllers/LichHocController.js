const { getSchedule, getExamSchedule } = require('../models/LichHocModel');
async function LichHoc(req, res) {
    const { mssv } = req.params;

    try {
        const lichHoc = await getSchedule(mssv);
        if (!lichHoc || lichHoc.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy lịch học" });
        }
        res.json(lichHoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }

}

module.exports = {
    LichHoc
};