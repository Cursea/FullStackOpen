const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    omitUndefined: true,
  })
    .then((updatedBlog) => {
      response.status(200).json(updatedBlog.toJSON())
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
