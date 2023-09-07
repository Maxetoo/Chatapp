const chatRoom = document.querySelector('.chat-room');
const chatInput = document.querySelector('input');
const chatForm = document.querySelector('.chat-form');
const chatBtn = document.querySelector('.chat-btn')
const socket = io();
let userId = ''

// Emit joinRoom event and send "just chilling" as the payload
// Event Anytime user joins room 

socket.emit('joinRoom', 'just chilling')

// Anytime a message is meant to be sent, the message event is triggered
socket.on('message', (message) => {
    // Anytime socket is on, from the server, broadcast this your message
    createMessage(message)
});

// Event to get the id of the sender
socket.on('sender', (id) => {
    userId = id
})


// Function to send message
const outputMessage = (e) => {
    e.preventDefault();
    let message = chatInput.value
    if (message) {
        socket.emit('chatMessage', message);
        chatInput.value = ''
    }

}

// Function to create message element
const createMessage = ({ username, message, time, id, sender }) => {
    chatRoom.innerHTML += `<div class="message-container ${userId === id ? 'sender-align' : 'receiver-align'}">
    <div class="message-box ${userId === id ? 'sender' : 'receiver'}">
        <h3>${username}</h3>
        <p class="message">${message}</p>
        <p class="time">${time}</p>
    </div>
</div>`

}


chatBtn.addEventListener('click', outputMessage)
chatForm.addEventListener('submit', outputMessage);