const connection = require('../../config/mysql')

module.exports = {
  addFriendContact: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO contact SET ?', id, (error, result) => {
        console.log(error)
        if (!error) {
          const newResult = {
            id: id
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },

  getAllContactData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact JOIN users ON contact.contact_friend_id = users.user_id',
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

  deleteOneContact: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM contact WHERE contact_friend_id=?',
        id,
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
