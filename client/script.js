const socket = io()

const messaging = (msgsArea, name, msg) => {
    const item = document.createElement('li')
    item.textContent = `${name}: ${msg}`
    msgsArea.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
}

const displayConnectionStatus = (nickName) => {
    const connectionStatus = document.getElementById('connectionStatus')
    connectionStatus.innerText = `Hello ${nickName} you connected Successfully`
}

socket.on('connect', () => {
    socket.nickName = prompt('Enter Your Name')
    displayConnectionStatus(socket.nickName)
    socket.emit('new user', socket.nickName)
    console.log(`A user connected with id ${socket.id}`)
    const messages = document.getElementById('messages')
    const form = document.getElementById('grpMsgForm')
    const input = document.getElementById('grpMsgInput')

    form.onsubmit = (e) => {
        e.preventDefault()
        if(input.value) {
            const msg = input.value
            socket.emit('group message', socket.nickName, msg)
        }
        input.value = ''
    }
    socket.on('new user', nickName => {
        alert(`${nickName} Has joined the Chat`)
    })
    socket.on('group message', (nickName, msg) => {
        messaging(messages, nickName, msg)
    })
    
    socket.on('user left', userNickName => {
        alert(`${userNickName} Has left the chat`)
    })
})

