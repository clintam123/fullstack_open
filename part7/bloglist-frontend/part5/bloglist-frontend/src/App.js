import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Menu from "./components/Menu";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeAllUsers } from "./reducers/usersReducer";

import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const blogFormRef = useRef();

  const userMatch = useRouteMatch("/users/:id");
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Switch>
        <Route path="/users/:id">
          <Notification />
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              <Menu />
              <h2>blog app</h2>
              <User user={foundUser} />
            </div>
          )}
        </Route>
        <Route path="/blogs/:id">
          <Notification />
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              <Menu />
              <h2>blog app</h2>
              <Blog blog={foundBlog} />
            </div>
          )}
        </Route>
        <Route path="/blogs">
          <Notification />
          {user === null ? (
            <LoginForm />
          ) : (
            <div>
              <Menu />
              <h2>blog app</h2>
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
              <Menu />
              <h2>blog app</h2>
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
    </Container>
  );
};

export default App;
