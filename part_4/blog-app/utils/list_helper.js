const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map((blog) => sum += blog.likes)
  //console.log(sum)
  return sum
}

const favoriteBlog = (blogs) => {
  let mostLikesPosition = 0
  blogs.map((blog, i) => {
    if (blog.likes > blogs[mostLikesPosition].likes) {
      mostLikesPosition = i
    }
  })
  return blogs[mostLikesPosition]
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
