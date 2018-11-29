let socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'xxxTomxxx',
        text: 'Hello everyone'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(`${message.from}: ${message.text} - ${message.createdAt}`);
});