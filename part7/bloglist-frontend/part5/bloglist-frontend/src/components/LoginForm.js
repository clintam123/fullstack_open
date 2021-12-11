import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useHistory } from "react-router-dom";

import { TextField, Button } from "@mui/material";

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
        <TextField name="username" label="username" variant="outlined" />
      </div>
      <div>
        <TextField
          name="password"
          label="password"
          variant="outlined"
          type="password"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
