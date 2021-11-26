import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setMessage("ERROR: Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
    } catch (exception) {
      setMessage("ERROR: cant logout");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      console.log(response);
      setBlogs(blogs.concat(response));
      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setMessage(`ERROR: Cant add blog ${blogObject.title}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const response = await blogService.update(blogObject);
      console.log(blogObject);
      console.log(response);
      setBlogs(
        blogs.map((blog) => (blog.id !== blogObject.id ? blog : blogObject))
      );
      setMessage(`blog ${blogObject.title} was successfully updated`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setMessage(`ERROR: Cant update blog ${blogObject.title}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Delete ${blogObject.title}?`)) {
        const response = await blogService.remove(blogObject);
        console.log(response);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        setMessage(`blog ${blogObject.title} was successfully deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } catch (exception) {
      console.log(exception);
      setMessage(`ERROR: Cant delete blog ${blogObject.title}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    />
  );

  const blogFormRef = useRef();
  const createBlog = () => {
    return (
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <br />
          <h2>Create new blog</h2>
          {createBlog()}
          {blogs
            .sort((x, y) => y.likes - x.likes)
            .map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
