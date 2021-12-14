const { index } = require('cheerio/lib/api/traversing')

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:4200']
    }
})

let userList = []



io.on('connection', socket => {

    let currentID = "guest"



    socket.on('send-message', (message, room) => {


        if (room === '') {

            socket.broadcast.emit('receive-message', message, currentID)

        } else {


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
            id: currentID,
            code: socket.id
        })

        io.emit('users', userList)

        console.log(userList)




    })

    socket.on('disconnect', () => {

        console.log(`User disconnected ${socket.id}`)

        io.emit('disconnected', socket.id)
    
        userList = userList.filter(user => user.code != socket.id)
    
        
    
    
    })




})



