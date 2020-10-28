const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Headache in the time of Corona",
    author: "Riikka Dimnik",
    url: "https://www.google.com/",
    likes: 34,
  },
  {
    title: "Sunshine",
    author: "Luka Dimnik",
    url: "https://www.google.com/",
    likes: 22,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
