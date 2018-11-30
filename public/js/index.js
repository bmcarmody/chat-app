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

socket.on('newLocationMessage', function(message) {
    let li = `<li>${message.from}: <a target="_blank" href="${message.url}">My current location</a></li>`;
    document.querySelector('#messages').insertAdjacentHTML('beforeend', li);
});

document.querySelector('#message-form').addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('input[name=message]').value
    }, function() {
        document.querySelector('input[name=message]').value = '';
    });
});

let locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    locationButton.setAttribute('disabled', 'disabled');
    locationButton.textContent = 'Sending Location';

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send Location';
    }, function() {
        alert('Unable to fetch location.')
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send Location';
    });
});