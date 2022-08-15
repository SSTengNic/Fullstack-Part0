import { updateLikes, removeTheBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import blogService from '../services/blogs'
import { createComment } from '../reducers/blogReducer'

const Blogs = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const incre = (blog) => {
    dispatch(updateLikes(blog))
  }

  if (!blog) {
    return null
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog, comment))
    setComment('')
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>
        <a href={blog.url}> {blog.url}</a>
      </p>
      <p>
        {' '}
        {blog.likes} likes{' '}
        <button
          onClick={() => {
            incre(blog)
          }}
        >
          {' '}
          like{' '}
        </button>
      </p>
      <p>added by {blog.user[0].name}</p>
      <h3>comments</h3>

      <form onSubmit={(event) => addComment(event)}>
        <input
          value={comment}
          onChange={handleComment}
          id="comment"
          placeholder="Comment"
        />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
