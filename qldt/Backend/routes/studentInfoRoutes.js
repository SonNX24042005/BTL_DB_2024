const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentInfoController');

router.get('/info', studentController.getStudentFullInfo);

module.exports = router;
