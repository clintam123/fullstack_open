import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Test for Blog component", () => {
  let blog = {
    title: "houshou marine",
    author: "hololive",
    url: "twitter.com/houshoumarine",
    likes: 69,
  };

  let component;
  const mockUpdateBlog = jest.fn();
  const mockDeleteBlog = jest.fn();

  beforeEach(
    () =>
      (component = render(
        <Blog
          blog={blog}
          updateBlog={mockUpdateBlog}
          deleteBlog={mockDeleteBlog}
        />
      ))
  );

  test("renders title and author, but does not render url or number of likes by default", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });

  test("the blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test("the like button is clicked twice, the event handler the component received as props is called twice", () => {
    const showButton = component.getByText("view");
    fireEvent.click(showButton);
    const likeButton = component.getByText("like");
    for (let i = 0; i < 2; i++) {
      fireEvent.click(likeButton);
    }

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});
