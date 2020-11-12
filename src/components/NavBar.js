import React from "react";
import { NavLink, Redirect, withRouter } from "react-router-dom";

const NavBar = (props) => {
  const logout = (event) => {
    event.preventDefault();
    if (localStorage.getItem("chatToken")) {
      localStorage.removeItem("chatToken");
      localStorage.removeItem("chatUser");
      props.history.push("/login");
    }
  };
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <span className='navbar-brand'>Chat Application</span>
        </div>
        <ul className='nav navbar-nav'>
          <NavLink to='/login' active={{ background: "blue" }}>
            {" "}
            Login
          </NavLink>
          <NavLink to='/register' active={{ background: "blue" }}>
            {" "}
            Register
          </NavLink>
          <NavLink to='/' active={{ background: "blue" }}>
            {" "}
            My DashBoard
          </NavLink>
          <span onClick={logout}>Logout</span>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
