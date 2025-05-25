const User = require('../models/userModelMySQL');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'baf4b23099c9d35d2fb1058ffff5b24ea71ef7a3af0f935d3bb6c0fb92605d602f6c7af917cd78132dce0d67db141b62f2daea1cbafc9310aaaff428486ee830';
exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
        // if (req.body.Username==res.)
    });
};

exports.getUserById = (req, res) => {
  User.getById(req.params.Username, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Không tìm thấy');
    res.json(results[0]);
  });
};

exports.createUser = (req, res) => {
  const Username = req.body.Username;
  const MatKhau = req.body.MatKhau;
  if (!Username) return res.status(400).send('Thiếu tên');
  User.create(Username,MatKhau, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ Username, MatKhau });
  });
};
// Thêm hàm loginUser
exports.loginUser = (req, res) => {
    const { Username, MatKhau } = req.body;

    if (!Username || !MatKhau) {
        return res.status(400).send('Thiếu tên đăng nhập hoặc mật khẩu.');
    }

    User.getById(Username, (err, results) => { // getById đang tìm theo Username
        if (err) return res.status(500).send(err.message);

        if (results.length === 0) {
            return res.status(401).send('Tên đăng nhập không tồn tại.');
        }

        const user = results[0];

        // QUAN TRỌNG: So sánh mật khẩu đã hash (ví dụ: bcrypt.compare)
        if (user.MatKhau === MatKhau) { 
            // Tạo token
            const tokenPayload = {
                username: user.Username
                //có thể thêm id người dùng hoặc vai trò nếu có
            };
            const token = jwt.sign(
                tokenPayload,
                JWT_SECRET,
                { expiresIn: '1h' } // Token hết hạn sau 1 giờ
            );

            res.json({
                message: 'Đăng nhập thành công',
                token: token, // Gửi token về cho client
                username: user.Username
            });
        } else {
            res.status(401).send('Mật khẩu không chính xác.');
        }
    });
};



console.log('✅ done controller' );