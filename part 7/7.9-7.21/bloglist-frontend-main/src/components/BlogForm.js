import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificaton } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const blogObject = (event) => {
    event.preventDefault()
    const blogObject = Object({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    // fix the toggling issue, check how other people did it ba. noteFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(setNotificaton(`a new blog ${title} by ${author}`, 3))
  }

  return (
    <div>
      <form onSubmit={(event) => blogObject(event)}>
        <div>
          Title:
          <input
            value={title}
            onChange={handleTitle}
            id="Title"
            placeholder="Title"
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={handleAuthor}
            id="Author"
            placeholder="Author"
          />
        </div>
        <div>
          Url:
          <input value={url} onChange={handleUrl} id="Url" placeholder="Url" />
        </div>
        <button type="submit">create form</button>
      </form>
    </div>
  )
}

export default BlogForm
