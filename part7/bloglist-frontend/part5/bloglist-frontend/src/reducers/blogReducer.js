import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "NEW_BLOG":
      return [...state, action.data];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    case "LIKE": {
      const id = action.data.id;
      return state.map((blog) => (blog.id === id ? action.data : blog));
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({ type: "NEW_BLOG", data: newBlog });
      dispatch(
        setNotification(`Blog ${blog.title} successfully updated`, "success", 5)
      );
    } catch (err) {
      dispatch(setNotification(`cannot create blog ${blog.title}`, "error", 5));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({ type: "DELETE_BLOG", data: blog.id });
      dispatch(
        setNotification(`Blog ${blog.title} successfully updated`, "success", 5)
      );
    } catch (err) {
      dispatch(setNotification("cannot delete blog", "error", 5));
    }
  };
};

export const like = (blog) => {
  return async (dispatch) => {
    try {
      const blogBeforeUpdate = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      const blogAfterUpdate = {
        ...blogBeforeUpdate,
        likes: blogBeforeUpdate.likes + 1,
      };
      dispatch({ type: "LIKE", data: blogAfterUpdate });
      dispatch(
        setNotification(`Blog ${blog.title} successfully updated`, "success", 5)
      );
    } catch (err) {
      dispatch(setNotification(`cannot like blog ${blog.title}`, "error", 5));
    }
  };
};

export default blogReducer;
