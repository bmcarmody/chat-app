let socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#message-template').innerHTML;
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#location-message-template').innerHTML;
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,   
        url: message.url
    });
    //let li = `<li>${message.from} ${formattedTime}: <a target="_blank" href="${message.url}">My current location</a></li>`;
    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
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