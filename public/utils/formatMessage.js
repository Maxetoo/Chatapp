const moment = require('moment')

const formatMessage = (username, message, sender, id) => {
    return {
        username,
        message,
        time: moment().format('h:mm a'),
        sender,
        id
    }
}

module.exports = formatMessage