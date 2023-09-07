const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./public/utils/formatMessage')
const { userJoin, getCurrentUser } = require('./public/utils/user')

app.use(express.static(path.join(__dirname, './public')));
const roomName = 'ChatBot'
let currentUser = {};


io.on('connection', socket => {

    socket.on('login', auth => {
        const { username, course } = auth
        currentUser = { username, course, id: socket.id }
    })

    socket.on('joinRoom', () => {
        currentUser.id = socket.id
        const user = userJoin(currentUser)
            // connect specific room
        socket.join(user.course)

        // welcome default message
        socket.emit('message', formatMessage(roomName, `Welcome to ${user.course} room`, false, user.id));

        // message to existing user
        socket.broadcast.to(user.course).emit('message', formatMessage(roomName, `User ${user.username} joined room`, false, user.id))


    });


    socket.on('chatMessage', msg => {
        // check for user with matching id
        const user = getCurrentUser(socket.id)
        socket.emit('sender', socket.id)
            // send message event to that particular location
        io.to(user.course).emit('message', formatMessage(user.username, msg, true, user.id));

    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`App is listening at port ${PORT}...`));