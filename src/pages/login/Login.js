import React, {useRef, useEffect, useContext} from "react";
import "./Login.css";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { login } from "../../redux/actions/auth";
import { BUYER, SELLER , ADMIN} from "../../helper/constants"

import { getProfile  } from "../../redux/actions/profile";
import {SetUserId} from "../../store/contexts/SetUserId";

const LoginComponent = (props) => {
  const setUserId = useContext(SetUserId);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formData = useRef();

  const loginHandler = (event) => {
    event.preventDefault();
    const credintial = {
      username: formData.current.username.value,
      password: formData.current.password.value,
    };

    if (credintial.username && credintial.password) {
      dispatch(login(credintial.username, credintial.password)).then((user) => {
        setUserId(user.id);

        dispatch(getProfile());

        if (user.authorities[0].authority == SELLER) navigate("/seller-profile");
        else if (user.authorities[0].authority == BUYER) navigate("/buyer-profile");
        else if (user.authorities[0].authority == ADMIN) navigate("/admin-profile");
        else navigate("/");
      });
    }
  };

  return (
    <div className="login">
      <form ref={formData} onSubmit={loginHandler}>
        <h2>Sign-In</h2>
        <br/>
        <div>
          <label htmlFor="username" className="label">
            UserName
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
        </div>

        <div >
          <button type="submit" className="btn">Login</button>

          <br/>
          <br/>

          <Link to="/register" >
            Create new account
          </Link>

        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
