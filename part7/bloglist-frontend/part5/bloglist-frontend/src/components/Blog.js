import React from "react";
import { useDispatch } from "react-redux";
import { like, deleteBlog, comment } from "../reducers/blogReducer";
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

  const increaseLikes = () => {
    dispatch(like(blog));
  };

  const removeBlog = () => {
    dispatch(deleteBlog(blog));
    history.push("/blogs");
  };

  const handleComment = (event) => {
    event.preventDefault();
    const commentToAdd = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(comment(blog, commentToAdd));
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <br />
      {blog.url} <br />
      likes : {blog.likes} <button onClick={increaseLikes}>like</button>
      <br />
      {blog.user.name}
      <br />
      <button id="remove-button" onClick={removeBlog}>
        remove
      </button>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input id="comment" type="text" name="comment" />
          <button id="comment-button" type="submit">
            add comment
          </button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
