const express = require('express')
const router = express.Router()
const contactController = require('./contact_controller')
// const authController = require('../auth/auth_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/contact',
  authMiddleware.authentication,
  contactController.getAllContact
)

router.post(
  '/add-contact/:id',
  authMiddleware.authentication,
  contactController.addFriend
)

module.exports = router
