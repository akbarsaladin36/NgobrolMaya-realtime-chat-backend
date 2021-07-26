const express = require('express')
const router = express.Router()

const {
  getAllUserProfile,
  getUserProfileById,
  updateUserProfile,
  updateUserImageProfile,
  deleteUserImageProfile
} = require('./users_controller')

const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

// Users
router.get('/profile', authMiddleware.authentication, getAllUserProfile)
router.get('/profile/:id', authMiddleware.authentication, getUserProfileById)
router.patch('/profile/:id', authMiddleware.authentication, updateUserProfile)
router.patch(
  '/profile/image/:id',
  authMiddleware.authentication,
  uploadFile,
  updateUserImageProfile
)
router.patch(
  '/profile/image-delete/:id',
  authMiddleware.authentication,
  uploadFile,
  deleteUserImageProfile
)

module.exports = router
