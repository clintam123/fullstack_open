import React from "react";
import User from "./User";
import { useSelector } from "react-redux";

const UserList = () => {
  const users = useSelector((state) => state.users);
  console.log(users);
  return users.map((user) => <User key={user.id} user={user} />);
};

export default UserList;
