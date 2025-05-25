const jwt = require('jsonwebtoken');
const JWT_SECRET = ''; // PHẢI GIỐNG VỚI KEY TRONG userController

module.exports = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối.' });
    }

    // Token thường có dạng "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Định dạng token không hợp lệ.' });
    }

    const token = tokenParts[1];

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối (sau khi split).' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Gắn thông tin user đã giải mã vào request
        next(); // Cho phép request tiếp tục
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};