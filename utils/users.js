//store info about all the users
const users=[]

//join user to chat
function userJoin(id,username,room){
    const user = {id,username,room}
    users.push(user)
    return user
}

//get current user by id
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//get the current user leaving and delete the entry from array
function userLeave(id){
    index = users.findIndex(user => user.id === id)
    if(index!==-1)return users.splice(index,1)[0]
}

//get users in room
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}