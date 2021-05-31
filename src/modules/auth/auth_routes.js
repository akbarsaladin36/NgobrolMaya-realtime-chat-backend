const express = require('express')
const router = express.Router()

const {
  registerUserAccount,
  loginUserAccount,
  getUserProfileById,
  updateUserProfile
} = require('./auth_controller')

const authMiddleware = require('../../middleware/auth')

router.post('/login', loginUserAccount)
router.post('/register', registerUserAccount)

// Users

router.get('/profile/:id', authMiddleware.authentication, getUserProfileById)
router.patch('/profile/:id', authMiddleware.authentication, updateUserProfile)

module.exports = router
