import React from "react";
import "../styles/chatroom.css";

const ChatMessage = (props) => {
  const { userId, senderId, msg, name } = props;
  return (
    <React.Fragment>
      {userId === senderId ? (
        <div className='container'>
          <p>{msg}</p>
          <span className='user-left'>{name}</span>
        </div>
      ) : (
        <div className='container darker'>
          <p>{msg}</p>
          <span className='user-right'>{name}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatMessage;
