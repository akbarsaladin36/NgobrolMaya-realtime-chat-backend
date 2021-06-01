const express = require('express')
const router = express.Router()
const chatController = require('./chat_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/:id',
  authMiddleware.authentication,
  chatController.getOneChatMessage
)
router.post(
  '/',
  authMiddleware.authentication,
  chatController.createChatMessage
)

module.exports = router
