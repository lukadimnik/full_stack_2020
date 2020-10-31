const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    console.log("authorization.substring(7): ", authorization.substring(7));
    return authorization.substring(7);
  }
  return null;
};
// OLD VERSION WITH PROMISES
// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });
// NEW VERSION WITH ASYNC / AWAIT
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});
// OLD VERSION
// blogsRouter.post("/", (request, response, next) => {
//   const blog = new Blog(request.body);

//   if (!blog.title || !blog.author || !blog.url || !blog.likes) {
//     return response.status(400).json({
//       error: "title, author, url or number of likes missing",
//     });
//   }

//   blog
//     .save()
//     .then((savedBlog) => {
//       response.status(201).json(savedBlog);
//     })
//     .catch((error) => next(error));
// });
// NEW VERSION
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  console.log("token: ", token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  if (!blog.title || !blog.author || !blog.url) {
    return response.status(400).json({
      error: "title, author, url or number of likes missing",
    });
  }

  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
  response.status(201).json(newBlog);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});
module.exports = blogsRouter;
