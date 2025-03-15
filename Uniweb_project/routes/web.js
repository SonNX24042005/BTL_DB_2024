const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')

router.get('/login', Login)


module.exports = router