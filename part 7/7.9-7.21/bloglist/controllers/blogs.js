const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user',{ username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const idblog = await Blog.findById(request.params.id)
  if (idblog) {
    response.json(idblog.toJSON())
  }

  response.status(404).end()
})


blogsRouter.post('/', async (request, response) => {
  const token = request.token
  console.log('goin through post, request.token is', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body
  const user = await User.findById(decodedToken.id)

  console.log('this is user ',user)
  
  
  const blog = new Blog({
    title: body.title ,
    author: body.author ,
    url: body.url, 
    likes: body.likes,

    user: user 
  })

  const savedBlog = await blog.save()
  if (user) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
  response.status(201).json(savedBlog.toJSON())  //what does this do again? shows up on the JSON server?
})


blogsRouter.delete('/:id', async (request, response) => {
  console.log('going through delete?')
  const token = request.token
  console.log('request token is',token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  const user = await User.findById(decodedToken.id)
  console.log('this is user.id', user)
  console.log('this is blog.user.id', blog)


  if(blog.user.toString() ===user.id.toString()){
    console.log('both match, going through with delete.')
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)  
})

blogsRouter.post('/:id/comments', async (request, response) => { //using post, because im adding comments.

  const addCommentBlog = await Blog.findById(request.params.id) //finding the blog to insert the comments
  console.log('G. blogsRouter, blog is: ', request.body)

  const body = request.body
  const commentedblog = {
    title: addCommentBlog.title,
    author: addCommentBlog.author,
    url: addCommentBlog.url,
    likes: addCommentBlog.likes,
    comments: addCommentBlog.comments.concat(body.comments)
  }

  const addedCommentBlog = await Blog.findByIdAndUpdate(request.params.id, commentedblog, {new: true})
  response.json(addedCommentBlog.toJSON()) //update the json server

})

module.exports = blogsRouter