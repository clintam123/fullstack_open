import React from "react";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { like, deleteBlog } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users);
  const foundUser = users.find((user) => user.id === blog.user);

  const increaseLikes = () => {
    dispatch(like(blog));
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog));
    history.push("/blogs");
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <br />
      <Togglable buttonLabel="view">
        {blog.url} <br />
        likes : {blog.likes} <button onClick={increaseLikes}>like</button>
        <br />
        {foundUser.name}
        <br />
        <button id="remove-button" onClick={removeBlog}>
          remove
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
