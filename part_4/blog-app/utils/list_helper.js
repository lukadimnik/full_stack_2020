const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.map((blog) => (sum += blog.likes));
  //console.log(sum)
  return sum;
};

const favoriteBlog = (blogs) => {
  let mostLikesPosition = 0;
  blogs.map((blog, i) => {
    if (blog.likes > blogs[mostLikesPosition].likes) {
      mostLikesPosition = i;
    }
  });
  return blogs[mostLikesPosition];
};

const mostBlogs = (blogs) => {
  const numBlogsByAuthor = {};
  const authors = blogs.map((blog) => blog.author);
  for (a of authors) {
    if (!numBlogsByAuthor[a]) {
      numBlogsByAuthor[a] = 1;
    } else {
      numBlogsByAuthor[a] += 1;
    }
  }
  let authorWithMostBlogs = "";
  let max = 0;
  for (a of authors) {
    if (numBlogsByAuthor[a] > max) {
      authorWithMostBlogs = a;
      max = numBlogsByAuthor[a];
    }
  }
  return {
    author: authorWithMostBlogs,
    blogs: numBlogsByAuthor[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  const numLikesByAuthor = {};
  for (b of blogs) {
    if (!numLikesByAuthor[b.author]) {
      numLikesByAuthor[b.author] = b.likes;
    } else {
      numLikesByAuthor[b.author] += b.likes;
    }
  }

  console.log("numLikesByAuthor", numLikesByAuthor);
  let authorWithMostBlogs = "";
  let max = 0;
  for (a of Object.keys(numLikesByAuthor)) {
    if (numLikesByAuthor[a] > max) {
      authorWithMostBlogs = a;
      max = numLikesByAuthor[a];
    }
  }

  const returnObject = {
    author: authorWithMostBlogs,
    blogs: numLikesByAuthor[authorWithMostBlogs],
  };

  return returnObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
