const express = require('express')
const router = express.Router()
const roomChatController = require('./room_chat_controller')
const authMiddleware = require('../../middleware/auth')

router.get(
  '/:userId',
  authMiddleware.authentication,
  roomChatController.getAllRoomChat
)
router.get(
  '/',
  authMiddleware.authentication,
  roomChatController.getOneRoomChat
)
router.post(
  '/',
  authMiddleware.authentication,
  roomChatController.createRoomChat
)

module.exports = router
