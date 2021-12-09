import React from "react";

const User = ({ user }) => {
  return (
    <div>
      {user.name} created {user.blogs.length} blogs
    </div>
  );
};

export default User;
