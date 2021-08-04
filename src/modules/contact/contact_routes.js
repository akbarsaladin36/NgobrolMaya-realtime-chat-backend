const express = require('express')
const router = express.Router()
const contactController = require('./contact_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/',
  authMiddleware.authentication,
  contactController.getAllContactByUserAndFriendId
)

router.get(
  '/:id',
  authMiddleware.authentication,
  contactController.getAllContact
)

router.post(
  '/add-contact/:id',
  authMiddleware.authentication,
  contactController.addFriend
)

router.delete(
  '/:id',
  authMiddleware.authentication,
  contactController.deleteContact
)

module.exports = router
