const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// OLD VERSION WITH PROMISES
// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });
// NEW VERSION WITH ASYNC / AWAIT
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author || !blog.url) {
    return response.status(400).json({
      error: "title, author, url or number of likes missing",
    });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const newBlog = await blog.save();
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
