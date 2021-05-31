const helper = require('../../helpers/wrapper')
const chatModel = require('../chat/chat_model')

module.exports = {
  createChatMessage: async (req, res) => {
    try {
      const { messageBody } = req.body
      const setData = {
        message: messageBody
      }
      const result = await chatModel.sendChatMessage(setData)
      return helper.response(res, 200, 'the chat message has been sent', result)
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getAllChatMessage: async (req, res) => {
    try {
      const result = await chatModel.getAllMessage()
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
