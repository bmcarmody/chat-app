const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const { isRealString } = require('../server/utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', socket => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      const errors = {};
      if (!isRealString(params.name)) {
        errors.name = 'Username is required';
      }

      if (!isRealString(params.room)) {
        errors.room = 'Room is required';
      }

      callback(errors);
    }

    if (users) {
      const errors = {};

      users.users.map(user => {
        if (params.name === user.name) {
          params = {};
          errors.name = 'Username is already taken';

          callback(errors);
        }
      });
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    setTimeout(() => {
      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit(
        'newMessage',
        generateMessage(
          'Admin',
          `Welcome ${params.name}, you are now in the "${
            params.room
          }" chat room`
        )
      );
      socket.broadcast
        .to(params.room)
        .emit(
          'newMessage',
          generateMessage('Admin', `${params.name} has joined`)
        );
    }, 500);

    callback();
  });

  socket.on('roomExit', () => {
    const user = users.removeUser(socket.id);
    socket.leave(user.room);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left`)
      );
    }
  });

  socket.on('createMessage', function(message, callback) {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        'newMessage',
        generateMessage(user.name, message.text)
      );
    }

    callback('');
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left`)
      );
    }
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    );
  });
}

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
