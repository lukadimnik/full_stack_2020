const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (
    body.username &&
    body.password &&
    (body.password.length < 3 || body.username.length < 3)
  ) {
    return response.status(400).json({
      error: "password and username must be at least 3 chracters long",
    });
  } else if (!body.username || !body.password) {
    return response.status(400).json({
      error: "must provide username and password",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
