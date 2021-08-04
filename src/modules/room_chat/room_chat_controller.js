const helper = require('../../helpers/wrapper')
const roomChatModel = require('./room_chat_model')

module.exports = {
  createRoomChat: async (req, res) => {
    try {
      const { roomChat, userId, friendId } = req.query

      // const roomChat = Math.floor(Math.random() * 10000 + 1)

      const setData = {
        room_chat: roomChat,
        user_id: userId,
        friend_id: friendId
      }

      const setData2 = {
        room_chat: roomChat,
        user_id: friendId,
        friend_id: userId
      }

      const result = []
      result.push(await roomChatModel.createRoomChatData(setData))
      result.push(await roomChatModel.createRoomChatData(setData2))

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
      const { userId } = req.params
      const result = await roomChatModel.getAllRoomChatData(userId)

      return helper.response(
        res,
        200,
        'all room chat is successfully showed',
        result
      )
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getOneRoomChat: async (req, res) => {
    try {
      const { room, userId } = req.query
      const result = await roomChatModel.getOneRoomChatData(room, userId)
      return helper.response(
        res,
        200,
        'Successfully get one room chat data',
        result
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
