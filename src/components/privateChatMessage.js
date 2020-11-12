import React from "react";
import "../styles/chatroom.css";

const PrivateChatMessage = (props) => {
  const { receiverId, senderId, messg, name } = props;

  return (
    <React.Fragment>
      {receiverId === senderId ? (
        <div className='container'>
          <p>{messg}</p>
          <span className='user-left'>{name}</span>
        </div>
      ) : (
        <div className='container darker'>
          <p>{messg}</p>
          <span className='user-right'>{name}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default PrivateChatMessage;
