const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  const users = await User.find({});
  const userId = users[0]._id.toString();
  await Blog.deleteMany({});
  let blogObject1 = new Blog(helper.initialBlogs[0]);
  blogObject1.user = userId;
  await blogObject1.save();
  blogObject2 = new Blog(helper.initialBlogs[1]);
  blogObject2.user = userId;
  await blogObject2.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Accept", "application/json")
    .auth()
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs that are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property is named id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];
  expect(blog.id).toBeDefined();
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((b) => b.title);
  expect(titles).toContain("Sunshine");
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Na klancu",
      author: "Ivan Cankar",
      url: "https://www.najdi.si/",
      likes: 8,
    };

    const userArray = await User.find({});

    const validUser = {
      username: userArray[0].username,
      id: userArray[0]._id,
    };

    const token = jwt.sign(validUser, process.env.SECRET);

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("Na klancu");
  });

  test("if likes property is missing it will default to 0", async () => {
    const newBlog = {
      title: "Na klancu",
      author: "Ivan Cankar",
      url: "https://www.najdi.si/",
    };

    const userArray = await User.find({});

    const validUser = {
      username: userArray[0].username,
      id: userArray[0]._id,
    };

    const token = jwt.sign(validUser, process.env.SECRET);

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1]).toHaveProperty("likes", 0);
  });

  test("if title and url are missing from request server returns code 400", async () => {
    const newBlog = {
      author: "Ivan Cankar",
      likes: 8,
    };

    const userArray = await User.find({});

    const validUser = {
      username: userArray[0].username,
      id: userArray[0]._id,
    };

    const token = jwt.sign(validUser, process.env.SECRET);

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(400);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("blog without a title is not added", async () => {
    const newBlog = {
      author: "Ivan Cankar",
      url: "https://www.najdi.si/",
      likes: 8,
    };

    const userArray = await User.find({});

    const validUser = {
      username: userArray[0].username,
      id: userArray[0]._id,
    };

    const token = jwt.sign(validUser, process.env.SECRET);

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("adding a blog fails if the token is not provided", async () => {
    const newBlog = {
      title: "Na klancu",
      author: "Ivan Cankar",
      url: "https://www.najdi.si/",
      likes: 8,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("a blog can be deleted if corect token is provided", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  const userArray = await User.find({});

  const validUser = {
    username: userArray[0].username,
    id: userArray[0]._id,
  };

  const token = jwt.sign(validUser, process.env.SECRET);

  await api
    .delete(`/api/blogs/${blogToDelete.id.toString()}`)
    .set("Authorization", "Bearer " + token)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);

  expect(titles).not.toContain(blogToDelete.title);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation of a new user succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "lukadimnik",
      name: "Luka Dimnik",
      password: "mango",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
