const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')

const socket = require('socket.io')

const app = express()
const port = process.env.DB_PORT

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use(xss())
app.use(helmet())
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/backend3/api/v1', routerNavigation)
app.use('/backend3/api', express.static('src/uploads'))

const server = require('http').createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/backend3/socket.io'
})

let listUserOnline = []

io.on('connection', (socket) => {
  console.log('new user connected')

  // globalMessage = pesan yang dikirimkan ke semua client.
  socket.on('globalMessage', (data) => {
    console.log(data)
    io.emit('chatMessage', data)
  })

  // privateMessage = pesan yang dikirimkan ke satu client saja.
  socket.on('privateMessage', (data) => {
    console.log(data)
    socket.emit('chatMessage', data)
  })

  // broadcastMessage = pesan yang dikirimkan ke seluruh client kecuali si pengirim.
  socket.on('broadcastMessage', (data) => {
    console.log(data)
    socket.broadcast.emit('chatMessage', data)
  })

  socket.on('connectServer', (userId) => {
    if (!listUserOnline.includes(userId)) {
      listUserOnline.push(userId)
    }
    io.emit('login', userId)
    console.log('list user online in this chat: ', listUserOnline)
  })

  socket.on('disconnectServer', ({ userId, room }) => {
    listUserOnline = listUserOnline.filter((element) => element !== userId)
    io.emit('logout', userId)
    // LEAVE ROOM FOR NOTIF
    socket.leave(userId)
    // LEAVE ROOM
    if (room) {
      socket.leave(room)
    }
  })

  socket.on('checkUserOnline', ({ userId, room }) => {
    if (listUserOnline.includes(userId)) {
      io.to(room).emit('isOnline', true)
    } else {
      io.to(room).emit('IsOnline', false)
    }
  })

  socket.on('joinRoom', (data) => {
    console.log(data)
    if (data.oldRoom) {
      socket.leave(data.oldRoom)
    }
    if (data.room) {
      socket.join(data.room)
    }
    console.log('Is room chat is empty?', socket.room)
  })

  socket.on('roomMessage', (data) => {
    io.to(data.room).emit('chatMessage', data)
  })

  socket.on('notifMessage', (data) => {
    socket.broadcast.to(data.receiverId).emit('notifMessage', data)
    console.log('Is room chat is empty?', socket.room)
  })

  socket.on('typingMessage', (data) => {
    socket.broadcast.to(data.room).emit('typing-message', data)
  })
})

server.listen(port, () => {
  console.log(`Express app is listen on port ${port} !`)
})
