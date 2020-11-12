import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashBoardPage = ({ socket, props }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [logInUsers, setLogInUsers] = useState([]);
  const [name, setName] = useState("");
  const [uname, setUname] = useState(localStorage.getItem("chatUser"));

  //get available chatrooms
  const getChatRooms = () => {
    const token = localStorage.getItem("chatToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/chatroom`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setChatRooms(response.data);
      })
      .catch((err) => {
        //setTimeout(getChatRooms, 3000);
      });
  };

  useEffect(() => {
    getChatRooms();
    //eslint-disable-next-line
  }, []);

  //get users who are connected
  const getOnlineUsers = () => {
    if (socket) {
      socket.emit("getavailableusers", socket._id);
    }
    if (socket) {
      socket.on("availableusers", (users) => {
        setLogInUsers(users);
        console.log(
          "Here is the list of all avilable users " + users["connectedUsers"]
        );
      });
    }
  };

  useEffect(() => {
    getOnlineUsers();
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const createRoom = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("chatToken");
    fetch(`${process.env.REACT_APP_BACKEND_URL}/chatroom`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    }).then((response) => {
      console.log("Creation done");
      setName("");
      getChatRooms();
    });
  };

  return (
    <React.Fragment>
      <h2> Welcome {uname}!!</h2>
      <div className='container'>
        <p className='text-muted'>
          Join an existing Chat Room or create a new one. You can also chat with
          your friends online!!
        </p>
        <div className='form-group mb-3'>
          <input
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
            id='name'
            className='form-control'
            placeholder='Enter a chatRoom name'
          />
          <div className='input-group-append'>
            <button onClick={createRoom} className='btn btn-primary'>
              {" "}
              Create
            </button>
          </div>
        </div>

        <div className='container'>
          <ul className='list-group'>
            <h2 className='text-muted'>Your ChatRooms</h2>
            {chatRooms.map((chatRoom) => (
              <li className='list-group-item' key={chatRoom._id}>
                {chatRoom.name}
                <span style={{ float: "right" }}>
                  <Link to={"/chatRoom/" + chatRoom._id + "/" + chatRoom.name}>
                    Join
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className='container'>
          <ul className='list-group'>
            <h2 className='text-muted'> Online Users</h2>
            {logInUsers.map((user) => (
              <li className='list-group-item' key={user.name}>
                {user.name}
                <span style={{ float: "right" }}>
                  <Link
                    to={
                      "/privateMsg/" +
                      socket.id +
                      "/" +
                      user.id +
                      "/" +
                      user.name +
                      "/" +
                      user.uid
                    }
                  >
                    Connect
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashBoardPage;
