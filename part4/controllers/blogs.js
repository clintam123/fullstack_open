const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

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

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end();
  }

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments || [],
    user: user._id,
  });
  console.log(blog);

  let savedBlog = await blog.save();
  savedBlog = await savedBlog.populate("user", { username: 1, name: 1 });
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
    comments: body.comments,
  };
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    newBlog
  ).populate("user", { username: 1, name: 1 });
  response.json(blog.toJSON());
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      await blog.remove();
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  }
);

module.exports = blogsRouter;
