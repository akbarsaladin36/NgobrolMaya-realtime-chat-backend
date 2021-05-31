const helper = require('../../helpers/wrapper')
const roomChatModel = require('../room_chat/room_chat_model')

module.exports = {
  createRoomChat: async (req, res) => {
    try {
      const { roomChat } = req.body
      const setData = {
        room_chat: roomChat
      }
      const result = await roomChatModel.createRoomChatData(setData)
      return helper.response(
        res,
        200,
        'the room chat is successfully created.',
        result
      )
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getAllRoomChat: async (req, res) => {
    try {
      const result = await roomChatModel.getAllRoomChatData()
      return helper.response(
        res,
        200,
        'the room chat is successfully showed',
        result
      )
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
