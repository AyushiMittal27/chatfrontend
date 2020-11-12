import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { email, password } = user;

  const handleChange = (name) => (event) => {
    setError("");
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      })
      .then((resposne) => {
        if (resposne.data.msg) {
          setError("Error");
        } else {
          console.log(resposne.data.user);
          localStorage.setItem("chatToken", resposne.data.token);
          localStorage.setItem("chatUser", resposne.data.name);
          localStorage.setItem("chatId", resposne.data.id);
          props.history.push("/dashboard");
          props.setToken();
          //props.setUpSocket();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <h4>Login</h4>
      <div className='jumbotron'>
        {error && <div className='alert alert-danger'> {error}</div>}
        <div className='form-group p-5'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            id='email'
            value={email}
            placeholder='something@xyz.com'
            onChange={handleChange("email")}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            className='form-control'
            onChange={handleChange("password")}
          ></input>
        </div>
        <button className='btn btn-block btn-primary' onClick={handleSubmit}>
          {" "}
          Login
        </button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(LoginPage);
