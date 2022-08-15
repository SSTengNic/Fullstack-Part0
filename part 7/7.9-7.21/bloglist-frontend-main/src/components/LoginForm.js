import PropTypes from 'proptypes'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'

const LoginForm = (props) => {
  console.log('going through login form')
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Username{' '}
        <TextField
          label="Username"
          size="small"
          onChange={props.handleUsernameChange}
          value={props.username}
        />
      </div>
      <p></p>
      <div>
        Password{' '}
        <TextField
          label="Password"
          size="small"
          onChange={props.handlePasswordChange}
          value={props.password}
        />
      </div>
      <div></div>
      <Button variant="contained" color="secondary" type="submit">
        Login
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
