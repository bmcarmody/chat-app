import React, { useState, useContext } from 'react';
import Message from '../atoms/Message';
import SocketContext from '../../store/socket-context';

const Chat = props => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);
  const [userList, setUserList] = useState([]);

  const socket = useContext(SocketContext);

  const onChange = e => {
    setText(e.target.value);
  };

  const onEnter = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const exitRoom = () => {
    props.history.push('/');
  };

  const sendMessage = () => {
    setText('');
    socket.emit('createMessage', { text }, () => {});
  };

  socket.on('newMessage', message => {
    setChat([
      ...chat,
      <Message
        from={message.from}
        createdAt={message.createdAt}
        text={message.text}
        key={message.createdAt}
      />
    ]);
  });

  socket.on('updateUserList', users => {
    setUserList([...users]);
  });

  return (
    <div className="chat">
      <div className="chat__userPanel">
        <h1 className="font__heading">Users</h1>
        <ul className="chat__userPanel__users">
          {userList.map(user => (
            <li key={user}>{user}</li>
          ))}
        </ul>
        <button
          className="chat__userPanel__exit font__heading"
          onClick={exitRoom}
        >
          Exit Chat Room
        </button>
      </div>
      <div className="chat__chatPanel">
        <ol className="chat__chatPanel__chat">
          {chat.map(message => message)}
        </ol>
        <div className="chat__chatPanel__bottom-bar">
          <input
            name="message"
            type="text"
            placeholder="Message"
            autoFocus
            autoComplete="off"
            onChange={onChange}
            className="chat__chatPanel__bottom-bar__input"
            value={text}
            onKeyPress={onEnter}
          />
          <button
            onClick={sendMessage}
            className="chat__chatPanel__bottom-bar__button font__heading"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
