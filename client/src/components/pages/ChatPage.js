import React, { useState, useContext } from 'react';
import Message from '../atoms/Message';
import SocketContext from '../../store/socket-context';

const ChatPage = props => {
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
    <div className="chatPage">
      <div className="chatPage__userPanel">
        <h1 className="font__heading">Users</h1>
        <ul className="chatPage__userPanel__users">
          {userList.map(user => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="chatPage__chatPanel">
        <ol className="chatPage__chatPanel__chat">
          {chat.map(message => message)}
        </ol>
        <div className="chatPage__chatPanel__bottom-bar">
          <input
            name="message"
            type="text"
            placeholder="Message"
            autoFocus
            autoComplete="off"
            onChange={onChange}
            className="chatPage__chatPanel__bottom-bar__input"
            value={text}
            onKeyPress={onEnter}
          />
          <button
            onClick={sendMessage}
            className="chatPage__chatPanel__bottom-bar__button font__heading"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
