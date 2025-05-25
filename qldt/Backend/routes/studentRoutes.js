const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


// Định nghĩa route để lấy thông tin sinh viên bằng email
router.get('/students/:email', studentController.getStudentDetails);

module.exports = router;