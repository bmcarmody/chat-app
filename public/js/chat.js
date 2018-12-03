let socket = io();

function scrollToBottom() {
    // Selectors
    let messages = document.querySelector('#messages');
    let newMessage = messages.lastElementChild;
    //Heights
    let clientHeight = messages.clientHeight;
    let scrollTop = messages.scrollTop;
    let scrollHeight = messages.scrollHeight;
    let newMessageHeight = newMessage.clientHeight;
    let lastMessageHeight = newMessage.clientHeight;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}

socket.on('connect', function() {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    let ol = document.createElement("ol");

    users.forEach(function(user) {
        let li = document.createElement("li");
        let text = document.createTextNode(user);
        li.appendChild(text);
        ol.appendChild(li);
    });

    console.log(ol);

    document.querySelector('#users').innerHTML = ol.outerHTML;
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
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = document.querySelector('#location-message-template').innerHTML;
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,   
        url: message.url
    });
    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();
});

document.querySelector('#message-form').addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
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