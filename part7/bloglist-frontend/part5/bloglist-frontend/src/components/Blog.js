import React from "react";
import { useDispatch } from "react-redux";
import { like, deleteBlog, comment } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Blog = ({ blog }) => {
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
    <div className="blog">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell width="10%">Title</TableCell>
              <TableCell>{blog.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>{blog.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell>{blog.url}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Likes</TableCell>
              <TableCell>
                {blog.likes}{" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={increaseLikes}
                >
                  like
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Added by user</TableCell>
              <TableCell>{blog.user.name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        id="remove-button"
        onClick={removeBlog}
      >
        remove
      </Button>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <TextField
            id="comment"
            name="comment"
            label="comment"
            variant="filled"
          />
        </div>
        <Button
          id="comment-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          add comment
        </Button>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Blog;
