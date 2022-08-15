const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlog.map(blog=> new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save()) 
  await Promise.all(promiseArray)
})

afterAll(() => {
  mongoose.connection.close()
})

test('HTTP GET', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test('test for UI ID', async ()=> {
  const blog = await Blog.find({})
  blog.length !==0
    ? expect(blog[0]._id).toBeDefined()
    : null
})

test('HTTP POST', async() => {
  const newBlog = ({
    title: 'Testing Testing',
    author: 'foos bar',
    url: 'you are elrata',
    likes: 50
  })

  const headers = {'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvdWxlbjAwIiwiaWQiOiI2MmUwMWE1MjhlYjE5NDVlMjdhNmFhM2UiLCJpYXQiOjE2NTg4OTczMzZ9.OWcuMH7dUJWWVtOtRHfbR0MruUz6r9FtM0r5T-t8n6k'}
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const lengthcheck = await helper.bloginDB()
  expect(lengthcheck).toHaveLength(helper.initialBlog.length+1)

  const contents = lengthcheck.map(n => n.title)
  expect(contents).toContain('Testing Testing')
},100000)

test('likes property test', async ()=> {
  const newBlog = ({
    title: 'Testing Testing',
    author: 'foos bar',
    url: 'you are elrata',
  })
  const checker = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  console.log('checker is: ',checker.body)
  expect(checker.body.likes).toBe(0)
})

test('title url test', async()=> {
  const newBlog = ({
    author: 'Janice Lim',
    likes: 30
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

},10000)

test('deleting note', async () => {
  const blogAtStart = await helper.bloginDB()
  const blogToDelete = blogAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

})

test('updating note', async () => {
  const blogAtStart = await helper.bloginDB()
  const blogToUpdate = blogAtStart[0]

  const UpdatedBlog = ({
    title: 'Sunny Days',
    author: 'Mich Album',
    url: 'fakenews',
    likes: 200
  })

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(UpdatedBlog)
    .expect(200)
})

// FOR EX 4.15 AND ABOVE. MIGHT WWANT TO SEPERATE IT WHEN YOU SUBMIT TO GITHUB.

test('username password test', async () => {
  const postBlog = ({
    username: 'Su',
    name: 'Vash the Stampede',
    password: '2'
  })

  await api
    .post('/api/users')
    .send(postBlog)
    .expect(400)
})