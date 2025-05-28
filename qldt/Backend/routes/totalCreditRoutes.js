const express = require('express');
const router = express.Router();
const totalCreditController = require('../controllers/totalCreditController');

router.get('/test1/:mssv', totalCreditController.getTotalCredit);

module.exports = router;

