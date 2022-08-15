import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export const SpecificUser = ({ user }) => {
  //why cant i export this properly?
  console.log('user.blogsss: ', user)
  return (
    <div>
      <h2>{user.name}</h2>
      <Table>
        <TableHead>
          <TableCell>
            <h2>Added Blogs</h2>
          </TableCell>
        </TableHead>
        <TableBody>
          {user.blogs.map((blogs) => (
            <SpecificUserBlog blogs={blogs} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
// Take note that if you are creating a component, IT HAS TO START WITH A CAPITAL LETTER!
const SpecificUserBlog = ({ blogs }) => {
  return (
    <TableRow>
      <TableCell>{blogs.title}</TableCell>
    </TableRow>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)

  console.log('users are: ', users)
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>username</TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default Users
