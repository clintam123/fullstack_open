import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);
  return users.map((user) => (
    <div key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name} </Link>
      created {user.blogs.length} blogs
    </div>
  ));
};

export default UserList;
