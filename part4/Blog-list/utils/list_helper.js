const _ = require('lodash')

const dummy = (blogs) => {
  if(!blogs && !blogs.length) {
    return null
  }

  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  if(!blogs && !blogs.length) {
    return null
  }

  let bestBlog = [...blogs].sort((a,b) => b.likes - a.likes)[0]

  return {
    title: bestBlog.title,
    author: bestBlog.author,
    likes: bestBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if(!blogs && !blogs.length) {
    return null
  }

  const blogsByAuthor = _(blogs)
    .groupBy(x => x.author)
    .map((value, key) => ({ author: key, blogs: value }))
    .value()

  const mostBlogsByAuthor = [...blogsByAuthor].sort((a,b) =>
    b.blogs.length - a.blogs.length)[0]

  return {
    author: mostBlogsByAuthor.author,
    blogs: mostBlogsByAuthor.blogs.length
  }
}

const mostLikes  = (blogs) => {
  if(!blogs && !blogs.length) {
    return null
  }

  const blogsByAuthor = _(blogs)
    .groupBy(x => x.author)
    .map((value, key) => ({ author: key, blogs: value }))
    .value()

  const mostLikedCount = 0
  const mostLikedAuthor = [blogsByAuthor].blogs.forEach(el =>)

  return {
    author: mostLikedAuthor.author,
    blogs: mostLikedAuthor.blogs.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes 
}