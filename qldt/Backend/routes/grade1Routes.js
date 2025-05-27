// Example: gradeRoutes.js
const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grade1Controller');

router.get('/grade1/:mssv', gradeController.getStudentGrades);

module.exports = router;