import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
    </div>
  );
};

export default Menu;
