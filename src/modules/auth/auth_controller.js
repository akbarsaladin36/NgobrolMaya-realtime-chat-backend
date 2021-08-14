const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper')
const authModel = require('./auth_model')
// const nodemailer = require('nodemailer')
// const fs = require('fs')
require('dotenv').config()

module.exports = {
  registerUserAccount: async (req, res) => {
    try {
      const { userEmail, userName, userPassword } = req.body

      const checkEmailUser = await authModel.getUserProfileData({
        user_email: userEmail
      })

      if (checkEmailUser.length > 0) {
        return helper.response(res, 400, 'Email is exists.please try again')
      } else {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(userPassword, salt)
        const setData = {
          user_email: userEmail,
          user_name: userName,
          user_password: encryptPassword,
        }
        const result = await authModel.registerUser(setData)
        delete result.user_password

        return helper.response(
          res,
          200,
          'User is successfully created.',
          result
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  },
  loginUserAccount: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getUserProfileData({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'Rahasia', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(
            res,
            200,
            'User is successfully logged in to website',
            result
          )
        } else {
          return helper.response(
            res,
            404,
            'Password is incorrect. please try again.',
            null
          )
        }
      } else {
        return helper.response(
          res,
          400,
          'Email is incorrect. Please try again.',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', null)
    }
  }
}
