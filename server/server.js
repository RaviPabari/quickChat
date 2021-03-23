const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'/../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

//builtin eventlistener 'connection' listens for new connections from the client side
io.on('connection',(socket)=>{
    console.log('A new user connected...')
    
    //listening for our custom eventlistener 'createMessage'
    //emitted by the client..
    socket.on('createMessage',(message)=>{
        console.log(message)
    })

    //emitting to the client side
    //this will be displayed only to the current user who connects
    //i.e. simply displaying a display message when user connects to the room
    socket.emit('newMessage',{
        from : "Server",
        text : "Welcome to the quickChat room",
        date : new Date().getTime()
    })

    //now this will broadcast the message to all the user
    //that a new user has connected to the room
    //all including the user itself who joined.
    //to broadcast to all the user including the current user
    //then use : io.emit()
    socket.broadcast.emit('newMessage',{
        from : "Server",
        text : "New user joined",
        date : new Date().getTime()
    })

    //once connected we can use this builtin eventlistener 'disconnect' to see if the user gets disconneted
    socket.on('disconnect',()=>{
        console.log('User disconnected....')
    })
    

})

server.listen(port,()=>{console.log(`listening on port ${port}`);})