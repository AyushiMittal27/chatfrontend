import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ChatMessage from "../components/chatMessage";
import FindMessages from "../components/FindMessages";

const ChatRoomPage = ({ match, socket }) => {
  const [chatRoomId, setchatRoomId] = useState(match.params.id);
  const [chatRoomName, setChatRoomName] = useState(match.params.roomName);
  const [uname, setUname] = useState(localStorage.getItem("chatUser"));
  const [messages, setMessages] = useState([]);
  const [umsg, setUMG] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("chatToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    // listening to events new message
    if (socket) {
      socket.on("newMessage", (nmessage) => {
        console.log("new messgae ", nmessage);
        const newMesages = [...messages];
        newMesages.push(nmessage);
        setMessages(newMesages);
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatRoomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatRoomId,
        });
      }
    };

    //eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setUMG(event.target.value);
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatRoomMessage", {
        chatRoomId,
        message: umsg,
      });
    }
    setUMG("");
  };

  return (
    <div>
      <h2 className='text-muted'>ChatRoom- {chatRoomName}</h2>
      {userId && <FindMessages id={chatRoomId} userId={userId} />}
      <div className='conatiner bg-dark'>
        {messages.map((msg, i) => (
          <ChatMessage
            userId={userId}
            senderId={msg.userID}
            msg={msg.message}
            name={msg.name}
            key={i}
          />
        ))}

        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            name='message'
            aria-label=''
            aria-describedby='basic-addon1'
            placeholder='Type a message'
            value={umsg}
            onChange={handleChange}
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatRoomPage);
