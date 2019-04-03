import React, { useState, useContext } from 'react';
import SocketContext from '../store/socket-context';

const Login = props => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [errors, setErrors] = useState({});

  const socket = useContext(SocketContext);

  const onClick = e => {
    const params = { name, room };

    socket.emit('join', params, err => {
      if (err) {
        setErrors(err);
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
    <React.Fragment>
      <input type="textbox" name="name" onChange={onChange} /> <br />
      {errors.name && <div>{errors.name}</div>}
      <input type="textbox" name="room" onChange={onChange} /> <br />
      {errors.room && <div>{errors.room}</div>}
      <button type="submit" onClick={onClick}>
        Submit
      </button>
    </React.Fragment>
  );
};

export default Login;
