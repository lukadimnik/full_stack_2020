const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// blogsRouter.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.author || !blog.url || !blog.likes) {
        return response.status(400).json({
            error: 'title, author, url or number of likes missing',
        })
    }

    blog
        .save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter