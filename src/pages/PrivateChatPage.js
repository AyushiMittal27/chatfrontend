import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PrivateChatMessage from "../components/privateChatMessage";
import PrivateHistory from "../components/PrivateHistory";

const PrivateChatPage = ({ match, socket, token }) => {
  const [cId, setCId] = useState(match.params.uid);
  const [rId, setRID] = useState(match.params.rid);
  const [rname, setRname] = useState(match.params.rname);
  const [onlineId, setOnlineId] = useState(match.params.oid);
  const [uname, setUname] = useState(localStorage.getItem("chatUser"));
  const [userId, setUserId] = useState(localStorage.getItem("chatId"));
  const [messages, setMessages] = useState([]);
  const [textmsg, setTextMsg] = useState("");

  useEffect(() => {
    //listening to myprivatemsg only if sockets id matches the receipents
    socket.on("MyPrivateMsg", (nmessage) => {
      const { sender, receiver } = nmessage;
      if (receiver === cId && (sender === cId || sender === rId)) {
        console.log("newPrivateMsg ", nmessage);
        const newMesages = [...messages];
        newMesages.push(nmessage);
        setMessages(newMesages);
      }
      /* if (sender === rId && receiver === cId) {
        socket.emit("receivedMyPrivatedMsg", {
          message: nmessage.message,
          userOwner: userId,
          msgWith: onlineId,
          sendername: rname,
          receivername: uname,
        });
      }
      if (sender === cId && receiver === cId) {
        socket.emit("receivedMyPrivatedMsg", {
          message: nmessage.message,
          userOwner: userId,
          msgWith: onlineId,
          sendername: uname,
          receivername: uname,
        });
      }  */
    });
  }, [messages]);

  const handleChange = (event) => {
    setTextMsg(event.target.value);
  };

  //send a message , emit an event
  const sendMessage = (event) => {
    event.preventDefault();
    if (socket) {
      socket.emit("PrivateMessage", {
        sender: cId,
        receiver: rId,
        message: textmsg,
        userOwner: userId,
        msgWith: onlineId,
        sendername: uname,
        receivername: rname,
      });
    }
    setTextMsg("");
  };

  return (
    <React.Fragment>
      <h4 className='text-muted'> {`${uname} / ${rname}`}</h4>
      <PrivateHistory uid={userId} rid={onlineId} uname={uname} />
      {messages.map((msg, i) => (
        <PrivateChatMessage
          key={i}
          receiverId={msg.sender}
          senderId={msg.receiver}
          messg={msg.message}
          name={msg.name}
        />
      ))}

      <div className='form-group'>
        <input
          type='text'
          name='textmsg'
          value={textmsg}
          className='form-control'
          placeholder='Type a message'
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary' onClick={sendMessage}>
        Send
      </button>
    </React.Fragment>
  );
};

export default withRouter(PrivateChatPage);
