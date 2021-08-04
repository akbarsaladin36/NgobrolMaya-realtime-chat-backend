const connection = require('../../config/mysql')

module.exports = {
  createRoomChatData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO room_chat SET ?',
        setData,
        (error, result) => {
          console.log(error)
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
  getAllRoomChatData: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room_chat JOIN users ON room_chat.friend_id = users.user_id WHERE room_chat.user_id = ?',
        userId,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getOneRoomChatData: (room, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room_chat JOIN users ON room_chat.friend_id = users.user_id WHERE room_chat.room_chat = ? AND room_chat.user_id = ?',
        [room, userId],
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
