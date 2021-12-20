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


        socket.join(room)

        if (id !== "") {
            currentID = id
        }



        console.log(`${socket.id} has joined: ${room}`)

        userList.push({
            id: currentID,
            code: socket.id,
            roomJoined: room
        })

        io.in(room).allSockets()
            .then(response => {

                let currentUsers = []

                userList.forEach(user => {

                response.forEach(element => {
                    if(element !== user.code){
                        return
                    }else{
                        currentUsers.push({

                            id: user.id,
                            code: element,
                            roomJoined: room
    
                        })

                    }

                    })

                
                });

                console.log(currentUsers)


                io.to(room).emit('users', currentUsers)

                

                


            })

            

            





    })

    socket.on('disconnect', () => {

        console.log(`User disconnected ${socket.id}`)

        io.emit('disconnected', socket.id)

        userList = userList.filter(user => user.code != socket.id)




    })

    socket.on('typing', message => {
        console.log(message)
    })




})



