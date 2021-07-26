const connection = require('../../config/mysql')

module.exports = {
  getAllUserProfileData: (keywords) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE user_email LIKE ?',
        keywords,
        (error, result) => {
          console.log(error)
          if (!error) {
            if (result.length === 0) {
              resolve([{}])
            } else {
              resolve(result)
            }
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getOneUserProfileData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE user_id=?',
        id,
        (error, result) => {
          console.log(error)
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updateUserProfileData: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE users SET ? WHERE user_id=?',
        [data, id],
        (error, result) => {
          console.log(error)
          console.log(result)
          if (!error) {
            const newResult = {
              id: id,
              ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
