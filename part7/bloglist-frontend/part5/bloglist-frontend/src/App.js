import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Menu from "./components/Menu";
import UserList from "./components/UserList";

import { Switch, Route, useHistory } from "react-router-dom";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/userReducer";
import { initializeAllUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const blogFormRef = useRef();
  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <Switch>
      <Route path="/blogs">
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <h2>blogs</h2>
            <Menu />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <br />
            <h2>Create new blog</h2>
            <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <BlogList />
          </div>
        )}
      </Route>
      <Route path="/users">
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <h2>blogs</h2>
            <Menu />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <br />
            <h2>Users</h2>
            <UserList />
          </div>
        )}
      </Route>
      <Route path="/">
        <Notification />
        <LoginForm />
      </Route>
    </Switch>
  );
};

export default App;
