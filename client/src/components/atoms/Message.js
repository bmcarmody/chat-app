import React from 'react';
import moment from 'moment';

const Message = props => {
  return (
    <li className="message">
      <img
        src="https://picsum.photos/200"
        alt="Random"
        className="message__image"
      />
      <div className="message__title">
        <h4>{props.from}</h4>
        <div className="message__createdAt">
          {moment(props.createdAt).format('h:mm a')}
        </div>
      </div>
      <div className="message__body">
        <p>{props.text}</p>
      </div>
    </li>
  );
};

export default Message;
