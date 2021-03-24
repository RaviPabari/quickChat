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

module.exports = {
    userJoin,
    getCurrentUser
}