const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Jen123',
        text: 'Hi!',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log(`New message from ${message.from}: ${message.text}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    })
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
})