const dummy = (blogs) => {
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}