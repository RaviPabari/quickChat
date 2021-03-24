const moment = require('moment')

function formatMessages(username, text){
    return{
        username,
        text,
        time : moment().format(' h:mm a') //hours : minutes + AM or PM
    }
}

module.exports = formatMessages