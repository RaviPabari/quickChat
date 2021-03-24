const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const socket = io()

//using querystring parser to get username and room from the URL
const { username, room } = Qs.parse(location.search, { 
    //ignores symbols like ?&    
    ignoreQueryPrefix: true 
})
// console.log(username, room)

//Join chatroom event
socket.emit('joinRoom',{ username, room })

//get room and users info
socket.on('roomUsers',({ room, users })=>{
    // console.log(users,room)
    displayRoomName(room),
    displayCurrentUsersInRoom(users)
})


socket.on('message', (msg)=>{
   // console.log(msg)
    displayMessage(msg)

    //after displaying the messages it should automatically SCROLL DOWN
    chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    //Get message text from the chatform by id=msg
    const message = e.target.elements.msg.value
    //emit the message to the server
    message.trim() && socket.emit('chatMessage',message)


    //clears out the input and automatically focuses on it
    e.target.elements.msg.value=''
    e.target.elements.msg.focus()
})

//output to DOM
function displayMessage(msg){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
		             <p class="text">${msg.text}</p>`
    document.querySelector('.chat-messages').appendChild(div)
}

//displaying room name to DOM
function displayRoomName(room){
    roomName.innerText = room
}

//displaying current users in the room to DOM
function displayCurrentUsersInRoom(users){
    // userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
  })
}