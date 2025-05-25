// routes/scholarshipRoutes.js
const express = require('express');
const { getAllScholarships, getScholarshipById } = require('../controllers/scholarshipControllerMongoDB');

const router = express.Router();

router.route('/scholarships')
    .get(getAllScholarships);

router.route('/scholarships/:id')
    .get(getScholarshipById);

module.exports = router;