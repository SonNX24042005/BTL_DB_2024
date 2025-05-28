const { totalCredit } = require('../models/totalCreditModel');

const getTotalCredit = async (req, res) => {
    const { mssv } = req.params;

    try {
        const [result] = await totalCredit(mssv);

        // Kiểm tra nếu không có kết quả hoặc giá trị null
        const total = result?.TongSoTin ? Number(result.TongSoTin) : 0;

        res.json({ mssv, total });
    } catch (error) {
        console.error("Lỗi khi tính tổng tín chỉ:", error);
        res.status(500).json({ error: 'Không thể tính tổng tín chỉ' });
    }
};

module.exports = {
    getTotalCredit
};
