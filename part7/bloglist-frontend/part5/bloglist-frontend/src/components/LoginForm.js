import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";
    dispatch(login(username, password));
    history.push("/blogs");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input id="username" type="text" name="username" />
      </div>
      <div>
        Password
        <input id="password" type="password" name="password" />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
