const connection = require('../../config/mysql')

module.exports = {
  sendChatMessage: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', setData, (error, result) => {
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
      })
    })
  },
  getAllMessageByRoomId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat WHERE room_chat=?',
        id,
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
