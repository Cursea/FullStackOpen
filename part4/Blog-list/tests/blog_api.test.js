const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
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
  })

  describe('deletion of a blog', () => {
    test('succeeds with a status of 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((blog) => blog.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with code 200 if id to update is valid', async () => {
      const blogToUpdate = helper.initialBlogs[0]
      const blogUpdate = {
        likes: 9999,
      }

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(blogUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

      const likes = blogsAtEnd.map((blog) => blog.likes)
      expect(likes).toContain(9999)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekretsss', 10)
    const user = new User({ username: 'initialUser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'tester',
      password: 'testpassword!',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode & message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'initialUser',
      password: 'rgeger£"£f2324!',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with correct status & message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'uniqueUserName',
      name: 'Cicero',
      password: 'g4',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'password is required, and must be at least 3 characters long'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with correct status & message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'eg',
      name: 'Cicero',
      password: 'g4ee32432KE',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'username is required, and must be at least 3 characters long'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
