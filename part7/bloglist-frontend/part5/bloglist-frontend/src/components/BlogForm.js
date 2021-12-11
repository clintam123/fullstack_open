import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

import { TextField, Button } from "@mui/material";

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
        <TextField name="title" id="title" label="Title" variant="filled" />
      </div>
      <div>
        <TextField name="author" id="author" label="Author" variant="filled" />
      </div>
      <div>
        <TextField name="url" id="url" label="Url" variant="filled" />
      </div>
      <Button variant="contained" color="primary" type="submit">
        create
      </Button>
    </form>
  );
};

export default BlogForm;
