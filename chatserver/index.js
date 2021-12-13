const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:4200']
    }
})

let userList = []

io.on('connection', socket => {

    let currentID = "guest"



    socket.on('send-message', (message, room) => {

        console.log(message)

        if (room === '') {

            socket.broadcast.emit('receive-message', message, currentID)

        } else {

            console.log(room)

            socket.to(room).emit('receive-message', message, currentID)

        }


    })


    socket.on('setup', (id, room) => {

        if (id !== "") {
            currentID = id
        }


        socket.join(room)

        console.log(`${socket.id} has joined: ${room}`)



        userList.push({
            id: currentID
        })

        socket.emit('users', userList)

        console.log(userList)


    })











})

