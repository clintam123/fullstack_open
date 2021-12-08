import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("Test for BlogForm component", () => {
  const blog = {
    title: "houshou marine",
    author: "hololive",
    url: "twitter.com/houshoumarine",
    likes: 69,
  };

  const mockHandler = jest.fn();
  let component;

  beforeEach(() => (component = render(<BlogForm addBlog={mockHandler} />)));

  test("the form calls the event handler it received as props with the right details when a new blog is created", () => {
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const likes = component.container.querySelector("#likes");
    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: { value: blog.title },
    });
    fireEvent.change(author, {
      target: { value: blog.author },
    });
    fireEvent.change(url, {
      target: { value: blog.url },
    });
    fireEvent.change(likes, {
      target: { value: blog.likes },
    });

    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title);
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author);
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url);
    expect(mockHandler.mock.calls[0][0].likes).toBe(blog.likes.toString());
  });
});
