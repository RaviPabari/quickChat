const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessages = require('./utils/messages')
const { getCurrentUser, userJoin } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const bot="QuickChat BOT"


io.on('connection',(socket)=>{

    //activates when a user joins a room
    socket.on('joinRoom',({ username, room})=>{

        //stores the info of the user to users[] in the users.js
        const user = userJoin(socket.id, username, room)
        
        //joins a socket to a particular room
        socket.join(user.room)
              
        //displays a welcome msg to the client
        socket.emit('message',formatMessages(bot,`Welcome to quickchat! ${user.username}`))

        //broadcast to the same room where the user connects
        //broadcasts to everyone except the user who is connecting
        socket.broadcast.to(user.room).emit('message', formatMessages(bot,`User has joined the chat`))
    })


    //listen for chatMessages
    socket.on('chatMessage',(message)=>{
        // console.log(message);
        //now we need to broadcast this message to everyone
        io.emit('message',formatMessages("USER",message))
    })

    //runs when client disconnects
    socket.on('disconnect',()=>{
        //this broadcasts the msg to all the users connected
        io.emit('message',formatMessages(bot,'A user has left the chat'))
    })
})



const PORT = process.env.PORT || 3000
server.listen(PORT,()=>console.log(`server running on port ${PORT}...`))