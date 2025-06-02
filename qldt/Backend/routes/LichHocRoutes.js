const express = require('express');
const router = express.Router();
const Schedule = require('../controllers/LichHocController');

//Lấy ra thông tin lịch học, lịch thi
router.get('/lichhoc/:mssv', Schedule.LichHoc);

module.exports = router;

