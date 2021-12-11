import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const UserList = () => {
  const users = useSelector((state) => state.users);
  // return users.map((user) => (
  //   <div key={user.id}>
  //     <Link to={`/users/${user.id}`}>{user.name} </Link>
  //     created {user.blogs.length} blogs
  //   </div>
  // ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name} </Link>
              </TableCell>
              <TableCell>{user.blogs.length} blogs</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
