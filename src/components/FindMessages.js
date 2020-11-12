import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatMessage from "../components/chatMessage";

const FindMessages = (props) => {
  const [allMessages, setAllMessages] = useState([]);

  const getMessages = () => {
    axios.get(`http://localhost:5400/message/${props.id}`).then((response) => {
      setAllMessages(response.data.messages);
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className='container'>
      {allMessages.map((m) => (
        <ChatMessage
          userId={props.userId}
          senderId={m.user._id}
          msg={m.message}
          name={m.user.name}
        />
      ))}
    </div>
  );
};

export default FindMessages;
