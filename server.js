const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const port = 3000

app.use(express.static('client'))

let connectedUsers = {}

io.on('connection', socket => {

    socket.on('new user', nickName => {
        socket.nickName = nickName
        connectedUsers[socket.id] = socket.nickName
        console.log(`${nickName} has connected, his id is: ${socket.id}`)
        console.log('Connected Users',connectedUsers)
        socket.broadcast.emit('new user', nickName)
        io.emit('usersList', connectedUsers)
    })

    socket.on('group message', (nickName ,msg) => {
        console.log(msg)
        socket.broadcast.emit('group message', nickName, msg)
    })

    socket.on('userIsTyping', (nickName) => {
        socket.broadcast.emit('userIsTyping', nickName)
    })

    socket.on('userIsNotTyping', () => {
        socket.broadcast.emit('userIsNotTyping')
    })

    socket.on('sendPrivateMsg', (senderID, recID, senderName, msg) => {
        socket.to(recID).emit('recPrivateMsg', senderID, senderName, msg)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.nickName} has disconnected, his id is: ${socket.id}`)
        socket.broadcast.emit('user left', socket.nickName)
        delete connectedUsers[socket.id]
        io.emit('usersList', connectedUsers)
        console.log('Connected Users',connectedUsers)
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})