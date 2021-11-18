const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end();
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end();
  }
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog);
  response.json(blog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove();
    response.status(204).end();
  } else {
    response.status(401).end();
  }
});

module.exports = blogsRouter;
