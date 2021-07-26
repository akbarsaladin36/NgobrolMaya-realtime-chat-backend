const helper = require('../../helpers/wrapper')
const usersModel = require('./users_model')
const fs = require('fs')

module.exports = {
  getAllUserProfile: async (req, res) => {
    try {
      let { keywords } = req.query
      keywords = '%' + keywords + '%' || '%%'
      const result = await usersModel.getAllUserProfileData(keywords)
      if (!result[0].user_id) {
        return helper.response(res, 200, 'No data found for this search', null)
      }
      return helper.response(res, 200, 'Success get all user profile', result)
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  getUserProfileById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getOneUserProfileData(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success get user profile by id ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          'User profile with id is not found.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { id } = req.params
      const { userEmail, userName, userPhoneNumber, userBio } = req.body
      const setData = {
        user_email: userEmail,
        user_name: userName,
        user_phone: userPhoneNumber,
        user_bio: userBio,
        user_updated_at: new Date(Date.now())
      }
      const result = await usersModel.getOneUserProfileData(id)
      if (result.length === 0) {
        return helper.response(
          res,
          400,
          `the data with ${id} is not found`,
          null
        )
      } else {
        const newResult = await usersModel.updateUserProfileData(setData, id)
        return helper.response(
          res,
          200,
          `Successfully update the data from id ${id}`,
          newResult
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  updateUserImageProfile: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_image: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }
      const updateData = await usersModel.getOneUserProfileData(id)
      if (updateData.length > 0) {
        if (updateData.length > 0) {
          const imageDelete = updateData[0].user_image
          const imageExist = fs.existsSync(`src/uploads/${imageDelete}`)

          if (imageExist && imageDelete) {
            fs.unlink(`src/uploads/${imageDelete}`, (err) => {
              if (err) throw err
            })
          }
        }

        const result = await usersModel.updateUserProfileData(setData, id)
        return helper.response(
          res,
          200,
          `Success uploading an profile image with ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          403,
          `the user image with ${id} is not found. Please try again.`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  },

  deleteUserImageProfile: async (req, res) => {
    try {
      const { id } = req.params
      const updateData = await usersModel.getOneUserProfileData(id)
      if (updateData.length > 0) {
        if (updateData.length > 0) {
          const imageDelete = updateData[0].user_account_image
          const imageExist = fs.existsSync(`src/uploads/${imageDelete}`)

          if (imageExist && imageDelete) {
            fs.unlink(`src/uploads/${imageDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const setData = {
          user_image: '',
          user_updated_at: new Date(Date.now())
        }
        const result = await usersModel.updateUserProfileData(setData, id)
        return helper.response(
          res,
          200,
          `Success deleting an profile image with ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          403,
          `the user image with ${id} is not found. Please try again.`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 404, 'Bad Request', null)
    }
  }
}
