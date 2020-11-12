import React, { useState } from "react";
import axios from "axios";

// register a user

const RegisterUser = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { name, email, password } = user;

  const handleChange = (event) => {
    setError("");
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register/`, {
        name,
        email,
        password,
      })
      .then((resposne) => {
        if (Response.data.error) {
          setError(resposne.data.error);
        } else {
          console.log(resposne.data.message);
          props.history.push("/login");
        }
      })
      .catch((err) => {
        setError("An unexpected aerror has occured. Please Try Again Later");
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <h2>Register</h2>
      <div className='jumbotron'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div className='container'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              id='name'
              placeholder='Enter your name'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              id='email'
              placeholder='something@xyz.com'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              className='form-control'
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <button className='btn btn-block btn-primary' onClick={handleSubmit}>
          Register
        </button>
      </div>
    </React.Fragment>
  );
};
export default RegisterUser;
