import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificaton } from '../reducers/notificationReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog }) => {
  return (
    <div style={blogStyle}>
      <Link to={`/blog/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

const PrintBlogs = () => {
  const blogs = useSelector((state) => state.blog)

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
}

export default PrintBlogs
