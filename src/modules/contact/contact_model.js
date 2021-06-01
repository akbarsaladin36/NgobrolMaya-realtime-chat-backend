const connection = require('../../config/mysql')

module.exports = {
  addFriendContact: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO contact SET ?',
        setData,
        (error, result) => {
          console.log(error)
          console.log(result)
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getAllContactDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact WHERE contact_user_id=?',
        id,
        (error, result) => {
          // console.log(error)
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getOneContactData: (userId, friendId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact WHERE contact_user_id=? AND contact_friend_id=?',
        [userId, friendId],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
          // console.log(result)
          // console.log(error)
        }
      )
    })
  },

  deleteOneContact: (userId, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM contact WHERE contact_user_id=? AND contact_friend_id=?',
        [userId, id],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
          // console.log(result)
          // console.log(error)
        }
      )
    })
  }
}
