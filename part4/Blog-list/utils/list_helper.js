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
  const maxLikes = Math.max(...blogs.map(el => el.likes))
  const best = blogs.map(blogs.find(blog => blog.likes  === maxLikes))

  return {
    f: 2
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}