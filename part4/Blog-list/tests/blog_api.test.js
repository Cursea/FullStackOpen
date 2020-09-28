const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs in the db are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id property on each blog exists', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((el) => expect(el.id).toBeDefined())
})

test('new blogs can be added to the blog list', async () => {
  const newBlog = {
    title: 'New Blog Test',
    author: 'Test Tester',
    url: 'thetest.blogspot.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain('New Blog Test')
})

test('blogs with no likes value default to zero likes', async () => {
  const zeroLikesBlog = {
    title: 'No one likes this blog',
    author: 'Cato the unpopular',
    url: 'roman-revival.blogspot.com',
  }

  await api
    .post('/api/blogs')
    .send(zeroLikesBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const postedBlog = blogsAtEnd.filter(
    (blog) => blog.author === 'Cato the unpopular'
  )
  expect(postedBlog[0].likes).toEqual(0)
})

test('posted blogs with missing title and url are rejected', async () => {
  const missingPropertiesBlog = {
    author: 'Cicero the rejected',
    likes: 54053,
  }

  await api.post('/api/blogs').send(missingPropertiesBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
