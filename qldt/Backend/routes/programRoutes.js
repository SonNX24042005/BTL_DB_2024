const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/student/:mssv/curriculum', programController.handleGetStudentProgramDetails);

module.exports = router;