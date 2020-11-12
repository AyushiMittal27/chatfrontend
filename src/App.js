import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterUser from "./pages/RegisterPage";
import DashBoardPage from "./pages/DashBoardPage";
import IndexPage from "./pages/IndexPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import io from "socket.io-client";
import PrivateChatPage from "./pages/PrivateChatPage";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

const App = () => {
  const [socket, setSocket] = useState("");
  const [token, setToken] = useState("");

  const setTokenVal = () => {
    setToken(localStorage.getItem("chatToken"));
  };

  useEffect(() => {
    setTokenVal();
  }, []);

  const setUpSocket = () => {
    if (token && !socket) {
      const newsocket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
        query: {
          token: localStorage.getItem("chatToken"),
        },
      });

      newsocket.on("disconnect", () => {
        console.log("Socket disconnected");
        setSocket(null);
        //   setTimeout(setUpSocket, 3000);
        // some error msg to show docket disconnected
      });

      newsocket.on("connect", () => {
        // success
        console.log("socket set");
        setSocket(newsocket);
      });
      console.log(newsocket, "  New Socket....");
    }
  };

  useEffect(() => {
    setUpSocket();
    // eslint-disable-next-line
  }, [token]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/' component={IndexPage} exact />
          <Route
            path='/login'
            render={() => (
              <LoginPage setUpSocket={setUpSocket} setToken={setTokenVal} />
            )}
            exact
          />
          <Route path='/register' component={RegisterUser} exact />
          <Route
            path='/dashboard'
            render={() => <DashBoardPage socket={socket} />}
            exact
          />
          <Route
            path='/chatRoom/:id/:roomName'
            render={() => <ChatRoomPage socket={socket} />}
            exact
          />
          <Route
            path='/privateMsg/:uid/:rid/:rname/:oid'
            render={() => <PrivateChatPage socket={socket} token={token} />}
            exact
          />
          <Route path='/' component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
