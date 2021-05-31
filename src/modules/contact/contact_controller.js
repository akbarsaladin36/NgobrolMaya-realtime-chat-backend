const helper = require('../../helpers/wrapper')
const authModel = require('../auth/auth_model')
const contactModel = require('./contact_model')

module.exports = {
  addFriend: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        contact_friend_id: id
      }
      const result = await authModel.getOneUserProfileData(id)
      if (result.length > 0) {
        const newResult = await contactModel.addFriendContact(setData)
        return helper.response(
          res,
          200,
          'Succes added a friend to your contact',
          newResult
        )
      } else {
        return helper.response(res, 404, 'The data is not found', null)
      }
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getAllContact: async (req, res) => {
    try {
      const result = await contactModel.getAllContactData()
      return helper.response(res, 200, 'Success get all contact.', result)
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
