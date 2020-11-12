import React, { useState, useEffect } from "react";
import axios from "axios";
import PrivateChatMessage from "./privateChatMessage";

const PrivateHistory = (props) => {
  const [allMessages, setAllMessages] = useState([]);

  const { uid, rid, uname } = props;
  const getMessages = () => {
    axios
      .get(`http://localhost:5400/pmessage/${uid}/${rid}`)
      .then((response) => {
        setAllMessages(response.data);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className='container'>
      {allMessages.map((m) => (
        <PrivateChatMessage
          senderId={uname}
          receiverId={m.receiver}
          messg={m.content}
          name={m.sender}
        />
      ))}
    </div>
  );
};

export default PrivateHistory;
