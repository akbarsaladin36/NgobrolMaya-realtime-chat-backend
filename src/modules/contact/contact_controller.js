const helper = require('../../helpers/wrapper')
const authModel = require('../auth/auth_model')
const contactModel = require('./contact_model')

module.exports = {
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.body
      const setData = {
        contact_user_id: userId,
        contact_friend_id: friendId
      }

      if (userId === friendId) {
        return helper.response(res, 403, 'Cannot add a contact.', null)
      }

      const result = await contactModel.getOneContactData(userId, friendId)
      if (result.length > 0) {
        return helper.response(res, 400, 'the contact has been added.', null)
      } else {
        const newResult = await contactModel.addFriendContact(setData)
        return helper.response(
          res,
          200,
          'Success added a friend to your contact',
          newResult
        )
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getAllContact: async (req, res) => {
    try {
      const { id } = req.params
      const result = await contactModel.getAllContactDataById(id)

      for (const contact of result) {
        contact.detail = await authModel.getOneUserProfileData(
          contact.contact_friend_id
        )
      }
      return helper.response(
        res,
        200,
        'Success get all contact data by id.',
        result
      )
    } catch (err) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteContact: async (req, res) => {
    try {
      const { userId, friendId } = req.query
      const checkContactData = await contactModel.getOneContactData(
        userId,
        friendId
      )
      if (checkContactData.length === 0) {
        return helper.response(res, 400, 'Contact is not found', null)
      }
      const result = await contactModel.deleteOneContact(userId, friendId)
      return helper.response(
        res,
        200,
        'the contact has been successfully deleted.',
        result
      )
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
