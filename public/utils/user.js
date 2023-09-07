const users = [];

// Join user to chat 

const userJoin = (userDetails) => {
    const { id, username, course } = userDetails
    const user = { id, username, course }

    users.push(user);

    return user
}

// Get the current user 

const getCurrentUser = id => {
    return users.find(user => user.id === id)
}


module.exports = {
    userJoin,
    getCurrentUser
}