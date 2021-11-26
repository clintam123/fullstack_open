import React from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updatedBlog);
  };

  const removeBlog = () => deleteBlog(blog);

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <br />
      <Togglable buttonLabel="view">
        {blog.url} <br />
        likes : {blog.likes} <button onClick={increaseLikes}>like</button>
        <br />
        {blog.user.username} <br />
        <button id="remove-button" onClick={removeBlog}>
          remove
        </button>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
