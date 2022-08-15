import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { setNotificaton } from './reducers/notificationReducer'
import { initializeBlog, createBlog } from './reducers/blogReducer'
import { clearUser, settingUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import HomePage from './routes/homePageRoute'
import { SpecificUser } from './routes/usersRoute'
import Users from './routes/usersRoute'
import Blogs from './routes/blogsRoute'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/users">
        users
      </Link>
      <Link styte={padding} to="/">
        blogs
      </Link>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const userz = useSelector((state) => state.user) //This is for the current user

  const noteFormRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    console.log('this is loggeduser from use effect', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(settingUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlog()), dispatch(initializeUsers())
  }, [])

  const users = useSelector((state) => state.users) //this is for the number of accounts
  const blogs = useSelector((state) => state.blog)

  console.log('blogs', blogs)

  const handleLogin = async (event) => {
    event.preventDefault()
    /*blogs.map(blog=> {
      const help = JSON.stringify(blog.user[0])
    console.log('wah HELP LA: ',help.name)
    })*/

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      //const help = blogs.find(blog=>blog.user[0].JSON.parse(username)===user.username)
      blogService.setToken(user.token)
      dispatch(settingUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificaton('Wrong Credentials', 3))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(clearUser())
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const matchUser = useMatch('/users/:id')
  const usero = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blog/:id')

  const blogo = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {userz === null ? (
        loginForm()
      ) : (
        <div>
          <h3>
            {userz.name} has logged in <button onClick={logout}>logout</button>
          </h3>
          <Menu />
          <h3></h3>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SpecificUser user={usero} />} />
            <Route path="/blog/:id" element={<Blogs blog={blogo} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
