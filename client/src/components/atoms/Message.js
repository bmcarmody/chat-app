import React from 'react';
import moment from 'moment';

const Message = props => {
  return (
    <li className="message">
      <div className="message__title">
        <h4>{props.from}</h4>
        <span>{moment(props.createdAt).format('h:mm a')}</span>
      </div>
      <div className="message__body">
        <p>{props.text}</p>
      </div>
    </li>
  );
};

export default Message;
