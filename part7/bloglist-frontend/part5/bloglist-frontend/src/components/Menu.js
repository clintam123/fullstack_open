import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

import { AppBar, Toolbar, Button } from "@mui/material";

const Menu = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <em>{user.name} logged in </em>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
