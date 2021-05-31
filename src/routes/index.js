const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const contactRouter = require('../modules/contact/contact_routes')
const chatRouter = require('../modules/chat/chat_routes')
const roomChatRouter = require('../modules/room_chat/room_chat_routes')

Route.use('/auth', authRouter)
Route.use('/contact', contactRouter)
Route.use('/chat', chatRouter)
Route.use('/room-chat', roomChatRouter)

module.exports = Route
