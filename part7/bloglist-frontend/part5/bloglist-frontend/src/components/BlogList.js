import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const style = {
    border: "1px solid black",
    padding: 8,
  };

  return blogs.sort(byLikes).map((blog) => (
    <table key={blog.id}>
      <tr>
        <td style={style}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </td>
      </tr>
    </table>
  ));
};

export default BlogList;
