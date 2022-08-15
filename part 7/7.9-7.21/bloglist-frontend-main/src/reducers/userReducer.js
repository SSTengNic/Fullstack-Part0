import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const noteSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      console.log('G setUser')
      console.log('user is: ', user)
      return user
    },
    clearUser(state, actions) {
      return null
    },
  },
})

export const { setUser, clearUser } = noteSlice.actions

export const settingUser = (user) => {
  return (dispatch) => {
    dispatch(clearUser())
    dispatch(setUser(user))
  }
}

export const removeUser = () => {
  return (dispatch) => {
    dispatch(clearUser())
  }
}

export default noteSlice.reducer
