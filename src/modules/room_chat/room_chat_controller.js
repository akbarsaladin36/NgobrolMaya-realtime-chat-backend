const helper = require('../../helpers/wrapper')
const roomChatModel = require('../room_chat/room_chat_model')

module.exports = {
  createRoomChat: async (req, res) => {
    try {
      const { userId, friendId } = req.body

      const checkUserRoom = await roomChatModel.getDataByUserIdAndFriendId(
        userId,
        friendId
      )
      const checkFriendRoom = await roomChatModel.getDataByUserIdAndFriendId(
        friendId,
        userId
      )

      if (checkUserRoom.length > 0 || checkFriendRoom.length > 0) {
        return helper.response(
          res,
          400,
          'the room has been added by someone.',
          null
        )
      }

      const roomChat = Math.floor(Math.random() * 10000 + 1)

      const setData = {
        user_id: friendId,
        friend_id: userId,
        room_chat: roomChat
      }

      const setData2 = {
        user_id: userId,
        friend_id: friendId,
        room_chat: roomChat
      }

      let result = await roomChatModel.createRoomChatData(setData)
      result = await roomChatModel.createRoomChatData(setData2)
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
      const { id } = req.params
      const result = await roomChatModel.getAllRoomChatData(id)

      for (const friend of result) {
        friend.friendDetail = await roomChatModel.getFriendDataById(
          friend.friend_id
        )
        friend.sampleChat = await roomChatModel.getSampleChatRoomDataById(
          friend.room_chat
        )
      }
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
