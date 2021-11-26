import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLikeChange = (event) => {
    setLikes(event.target.value);
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();

    addBlog({
      title,
      author,
      likes,
      url,
    });
    setTitle("");
    setLikes("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title:
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input id="url" type="url" value={url} onChange={handleUrlChange} />
      </div>
      <div>
        Likes:
        <input
          id="likes"
          type="number"
          value={likes}
          onChange={handleLikeChange}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
