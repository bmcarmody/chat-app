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
    let li = document.createElement('li');
    let lText = document.createTextNode(`${message.from}`);
    li.appendChild(lText);

    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', `${message.url}`);
    let aText = document.createTextNode('My current location');
    a.appendChild(aText);
    li.appendChild(a);
    document.querySelector('#messages').insertAdjacentHTML('beforeend', li.innerHTML);
    

});

document.querySelector('#message-form').addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('input[name=message]').value
    }, function() {

    });
});

let locationButton = document.querySelector('#send-location');

locationButton.addEventListener('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location.')
    });
});