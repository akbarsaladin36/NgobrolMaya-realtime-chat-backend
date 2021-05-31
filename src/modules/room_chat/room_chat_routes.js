const express = require('express')
const router = express.Router()
const roomChatController = require('./room_chat_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/',
  authMiddleware.authentication,
  roomChatController.getAllRoomChat
)
router.post(
  '/',
  authMiddleware.authentication,
  roomChatController.createRoomChat
)

module.exports = router
