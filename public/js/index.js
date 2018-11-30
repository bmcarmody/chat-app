let socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log(`${message.from}: ${message.text} - ${message.createdAt}`);
    let li = `<li>${message.from}: ${message.text} </li>`;
    document.querySelector('#messages').insertAdjacentHTML('beforeend', li);
});

document.querySelector('#message-form').addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('input[name=message]').value
    }, function() {

    });
});