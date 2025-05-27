const express = require('express');
const router = express.Router();
const programController = require('../controllers/gradeController');

// Định nghĩa route để lấy kết quả học tập theo MSSV
router.get('/:mssv', programController.getProgramByMssv);

module.exports = router;