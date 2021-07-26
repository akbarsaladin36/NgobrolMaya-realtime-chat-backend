const express = require('express')
const router = express.Router()
const contactController = require('./contact_controller')
// const authController = require('../auth/auth_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/:id',
  authMiddleware.authentication,
  contactController.getAllContact
)

router.post(
  '/add-contact',
  authMiddleware.authentication,
  contactController.addFriend
)

router.delete(
  '/',
  authMiddleware.authentication,
  contactController.deleteContact
)

module.exports = router
