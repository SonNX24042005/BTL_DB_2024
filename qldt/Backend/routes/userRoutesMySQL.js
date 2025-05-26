const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllerMySQL.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/users', userController.getAllUsers);
router.get('/user/:Username', userController.getUserById);
router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/users/me', authMiddleware, (req, res) => {
    // req.user chứa payload từ token
    // có thể dùng req.user.username để truy vấn DB lấy thông tin chi tiết nếu cần
    User.getById(req.user.username, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Không tìm thấy thông tin người dùng.');
        const { MatKhau, ...userInfo } = results[0]; // Loại bỏ mật khẩu khỏi response
        res.json(userInfo);
    });
});


// console.log('✅ done router');
module.exports = router;
