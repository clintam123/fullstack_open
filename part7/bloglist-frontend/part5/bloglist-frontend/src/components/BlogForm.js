import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
    const newBlog = { title, author, url };
    dispatch(createBlog(newBlog));
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title:
        <input id="title" type="text" name="title" />
      </div>
      <div>
        Author:
        <input id="author" type="text" name="author" />
      </div>
      <div>
        Url:
        <input id="url" type="url" name="url" />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
