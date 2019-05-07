import React, { useState, useContext } from 'react';
import Message from '../atoms/Message';
import SocketContext from '../../store/socket-context';

const ChatPage = props => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);

  const socket = useContext(SocketContext);

  const onChange = e => {
    setText(e.target.value);
  };

  const sendMessage = () => {
    socket.emit(
      'createMessage',
      {
        text
      },
      () => {}
    );
  };

  socket.on('newMessage', message => {
    console.log(message);
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

  return (
    <div className="chatPage">
      <ol className="chatPage__chat">{chat.map(message => message)}</ol>
      <input
        name="message"
        type="text"
        placeholder="Message"
        autoFocus
        autoComplete="off"
        onChange={onChange}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
