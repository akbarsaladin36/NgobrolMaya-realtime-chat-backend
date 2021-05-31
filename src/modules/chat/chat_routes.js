const express = require('express')
const router = express.Router()
const chatController = require('./chat_model')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.authentication, chatController.getAllMessage)
router.post('/', authMiddleware.authentication, chatController.sendChatMessage)

module.exports = router
