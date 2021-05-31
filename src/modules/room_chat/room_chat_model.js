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
  getAllRoomChatData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM room_chat', (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}