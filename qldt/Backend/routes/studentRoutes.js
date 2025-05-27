const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


router.get('/students/:email', studentController.getStudentDetails);

module.exports = router;