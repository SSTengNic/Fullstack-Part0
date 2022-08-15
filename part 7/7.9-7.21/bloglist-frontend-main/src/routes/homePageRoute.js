import PrintBlogs from '../components/PrintBlogs'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const HomePage = () => {
  return (
    <div>
      <h1>create new</h1>
      <Togglable buttonLabel="new note">
        <BlogForm />
      </Togglable>
      <PrintBlogs />
    </div>
  )
}

export default HomePage
