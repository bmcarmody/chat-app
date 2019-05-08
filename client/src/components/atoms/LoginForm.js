import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import SocketContext from '../../store/socket-context';

const LoginForm = props => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [errors, setErrors] = useState({});

  const socket = useContext(SocketContext);

  const onClick = e => {
    const params = { name, room };

    socket.emit('join', params, err => {
      if (err) {
        setErrors(err);
      } else {
        props.history.push(`./chat/room=${room}`, { user: name });
      }
    });
  };

  const onChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else {
      setRoom(e.target.value);
    }
  };
  return (
    <div className="loginForm">
      <h1>Join a Chatroom!</h1>
      <hr />
      <div className="loginForm__group">
        <label htmlFor="name">Username </label>
        {errors.name && <div className="loginForm__error">{errors.name}</div>}
        <br />
        <input
          type="textbox"
          name="name"
          onChange={onChange}
          placeholder="Enter a username"
          autoFocus
        />
        <br />
      </div>
      <div className="loginForm__group">
        <label htmlFor="room">Room </label>
        {errors.room && <div className="loginForm__error">{errors.room}</div>}
        <br />
        <input
          type="textbox"
          name="room"
          onChange={onChange}
          placeholder="Enter a room to join"
        />
        <br />
      </div>
      <button type="submit" onClick={onClick} className="font__heading">
        Join
      </button>
    </div>
  );
};

export default withRouter(LoginForm); // Allows access to props.history.push
