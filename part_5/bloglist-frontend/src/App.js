import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
    user: "",
  });
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  console.log("errorMessagel: ", errorMessage);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNotificationMessage(
          `New blog with the title "${newBlog.title}" added!`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewBlog({
          title: "",
          author: "",
          url: "",
          likes: "",
          user: "",
        });
      })
      .catch((err) => {
        setErrorMessage(err.toString());
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const logout = () => {
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notificationMessage} error={errorMessage} />

        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notificationMessage} error={errorMessage} />
      <h1>BLOGS</h1>
      <span>
        <p>
          {user.name} logged-in <button onClick={logout}>logout</button>
        </p>
      </span>
      <div>
        <h1>Create New</h1>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input
              value={newBlog.title}
              name="Title"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />
          </div>
          <div>
            Author:
            <input
              value={newBlog.author}
              name="Author"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
          </div>
          <div>
            Url:
            <input
              value={newBlog.url}
              name="Url"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
