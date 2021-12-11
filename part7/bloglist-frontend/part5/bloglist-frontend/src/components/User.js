import React from "react";
import { Link } from "react-router-dom";

import { List, ListItem } from "@mui/material";

const User = ({ user }) => {
  return (
    <div>
      {!user ? null : (
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default User;
