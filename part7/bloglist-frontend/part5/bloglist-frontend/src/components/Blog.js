import React from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { like, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const increaseLikes = () => {
    dispatch(like(blog));
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog));
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <br />
      <Togglable buttonLabel="view">
        {blog.url} <br />
        likes : {blog.likes} <button onClick={increaseLikes}>like</button>
        <br />
        {blog.user.name} <br />
        <button id="remove-button" onClick={removeBlog}>
          remove
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
