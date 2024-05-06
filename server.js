const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const port = 3000

app.use(express.static('client'))

io.on('connection', socket => {
    console.log(`A user connected with id ${socket.id}`)

    socket.on('new user', nickName => {
        socket.nickName = nickName
        console.log(`${nickName} has connected, his id is: ${socket.id}`)
        socket.broadcast.emit('new user', nickName)
    })

    socket.on('group message', (nickName ,msg) => {
        console.log(msg)
        io.emit('group message', nickName, msg)
    })

    socket.on('disconnect', () => {
        console.log(`User with id ${socket.id} Disconnected`)
        socket.broadcast.emit('user left', socket.nickName)
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})