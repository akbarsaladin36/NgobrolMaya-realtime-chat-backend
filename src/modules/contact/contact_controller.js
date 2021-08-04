const helper = require('../../helpers/wrapper')
const contactModel = require('./contact_model')

module.exports = {
  addFriend: async (req, res) => {
    try {
      const { id } = req.params
      const { friendId } = req.query
      const setData = {
        contact_user_id: id,
        contact_friend_id: friendId
      }
      const result = await contactModel.addFriendContact(setData)
      return helper.response(
        res,
        200,
        'Success added a friend to your contact',
        result
      )
    } catch (err) {
      console.log(err)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },
  getAllContact: async (req, res) => {
    try {
      const { id } = req.params
      const result = await contactModel.getAllContactDataById(id)

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

  getAllContactByUserAndFriendId: async (req, res) => {
    try {
      const { userId, friendId } = req.query

      const result = await contactModel.getOneContactData(userId, friendId)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success get contact by user and friend id',
          result
        )
      } else {
        return helper.response(
          res,
          400,
          'the data of contact is not found',
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', null)
    }
  },

  deleteContact: async (req, res) => {
    try {
      const { id } = req.params
      const { friendId } = req.query
      const result = await contactModel.deleteOneContact(id, friendId)
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
