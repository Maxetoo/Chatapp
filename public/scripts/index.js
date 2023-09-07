const userInput = document.querySelector('input');
const userForm = document.querySelector('.auth-form')
const userCourse = document.querySelector('select');
const userButton = document.querySelector('.auth-btn');
let invalid
const socket = io();



const checkInvalid = () => {
    if (invalid) {
        console.log(invalid);
        userInput.style.border = `solid 1.5px red`
    } else {
        userInput.style.border = `solid 1px black`

    }
}

const removeInvalidChecker = (e) => {
    if (invalid) {
        invalid = false
    }

    checkInvalid()
}



const login = (e) => {
    e.preventDefault()
    let username = userInput.value
    let course = userCourse.value

    if (!username) {
        invalid = true
    } else {
        invalid = false
        window.location.href = '../chatroom.html'
        socket.emit('login', { username, course })

    }

    checkInvalid()
}




userButton.addEventListener('click', login);
userInput.addEventListener('input', removeInvalidChecker);
userForm.addEventListener('submit', login);