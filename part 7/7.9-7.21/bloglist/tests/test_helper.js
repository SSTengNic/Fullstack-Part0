const Blog = require('../models/blog')


const initialBlog = [
  {
    title: 'Sunny Days',
    author: 'Mich Album',
    url: 'fakenews',
    likes: 50
  },
  {
    title: 'Yeehaw, a love story',
    author: 'Nicholas Teng',
    url: 'realnews',
    likes: 50
  }
]

const bloginDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog=>blog.toJSON())
}

module.exports = {
  initialBlog, bloginDB
}