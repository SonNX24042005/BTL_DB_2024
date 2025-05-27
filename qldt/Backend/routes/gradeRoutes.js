const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
router.get('/grade/:mssv', gradeController.getStudentCPA);

module.exports = router;