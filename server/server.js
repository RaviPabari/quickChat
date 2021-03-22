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
    
//once connected we can use this builtin eventlistener 'disconnect' to see if the user gets disconneted
    socket.on('disconnect',()=>{
        console.log('User disconnected....')
    })
})

server.listen(port,()=>{console.log(`listening on port ${3000}`);})