import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    console.log(blog);
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    console.log(updatedBlog);
    updateBlog(updatedBlog);
  };

  const removeBlog = () => deleteBlog(blog);

  const showFullBlog = () => (
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>
        {blog.likes}{" "}
        <button id="like-button" onClick={increaseLikes}>
          like
        </button>
      </p>
      <button id="remove" onClick={removeBlog}>
        remove
      </button>
    </div>
  );

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} - {blog.author}{" "}
          <button id="view-button" onClick={toggleVisibility}>
            {buttonLabel}
          </button>
        </p>
      </div>
      {visible && showFullBlog()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
