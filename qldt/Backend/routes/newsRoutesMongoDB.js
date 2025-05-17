const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsControllerMongoDB');

router.get('/news', newsController.getAll);

module.exports = router;