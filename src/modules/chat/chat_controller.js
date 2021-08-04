const helper = require('../../helpers/wrapper')
const chatModel = require('../chat/chat_model')

module.exports = {
  createChatMessage: async (req, res) => {
    try {
      const { roomChat, senderId, receiverId, messageBody } = req.body
      const setData = {
        room_chat: roomChat,
        sender_id: senderId,
        receiver_id: receiverId,
        message: messageBody
      }
      const result = await chatModel.sendChatMessage(setData)
      return helper.response(res, 200, 'the chat message has been sent', result)
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getOneChatMessage: async (req, res) => {
    try {
      const { id } = req.params
      const result = await chatModel.getAllMessageByRoomId(id)
      return helper.response(
        res,
        200,
        'the chat message is successfully showed',
        result
      )
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
