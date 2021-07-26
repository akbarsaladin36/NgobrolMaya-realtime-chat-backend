const express = require('express')
const router = express.Router()

const { registerUserAccount, loginUserAccount } = require('./auth_controller')

const authMiddleware = require('../../middleware/auth')

router.post('/login', loginUserAccount)
router.post('/register', registerUserAccount)

module.exports = router
