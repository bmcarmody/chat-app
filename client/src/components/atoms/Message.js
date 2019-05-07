import React from 'react';
import moment from 'moment';

const Message = props => {
  return (
    <li className="message">
      <div className="message__title">
        <h4 className="font__heading message__from">{props.from}</h4>
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
