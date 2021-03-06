const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Sunshine",
    author: "Luka Dimnik",
    url: "https://www.google.com/",
    likes: 22,
  },
  {
    title: "Headache in the time of Corona",
    author: "Luka Dimnik",
    url: "https://www.google.com/",
    likes: 34,
  },
];

const initialUsers = [
  {
    username: "lukadimnik",
    name: "Luka Dimnik",
    password: "mango",
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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
