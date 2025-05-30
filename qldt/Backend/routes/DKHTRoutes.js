const express = require('express');
const router = express.Router();
const dkhtController = require('../controllers/DKHTController');

//Lấy ra thông tin môn học theo mã học phần
router.get('/monhoc/:MaHP', dkhtController.ThemMonHoc);
router.post('/dangky/:mssv', dkhtController.DangKyHocTap);
router.get('/dadangky/:mssv', dkhtController.LayMonHocDaDangKy);
router.delete('/xoadangky/:mssv', dkhtController.XoaMonHocDaDangKy);

module.exports = router;

