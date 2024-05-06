const socket = io()

socket.on('connect', () => {
    console.log(`A user connected with id ${socket.id}`)
})