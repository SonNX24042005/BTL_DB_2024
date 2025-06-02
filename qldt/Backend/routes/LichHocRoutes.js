const express = require('express');
const router = express.Router();
const Schedule = require('../controllers/LichHocController');

//Lấy ra thông tin lịch học, lịch thi
router.get('/lichhoc/:mssv', Schedule.LichHoc);
router.get('/lichthi/:mssv', Schedule.LichThi);


module.exports = router;

