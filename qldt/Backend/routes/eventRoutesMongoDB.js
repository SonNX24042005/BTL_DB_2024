const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllerMongoDB');

router.get('/events', eventController.getAll);

module.exports = router;