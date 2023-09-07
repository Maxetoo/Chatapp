const user = []

const colletUserInfo = (username, course) => {
    let newUser = { username, course, id: new Date().getTime().toLocaleString() }
    return user.push(newUser)
};

module.exports = {
    colletUserInfo
}