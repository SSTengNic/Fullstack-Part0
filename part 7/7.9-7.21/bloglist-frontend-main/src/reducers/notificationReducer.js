import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const noteSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotif(state, action) {
      if (action) {
        return action.payload
      }
      return state
    },
  },
})

export const { createNotif } = noteSlice.actions

let timeoutID
export const setNotificaton = (content, time) => {
  return (dispatch) => {
    console.log('G. setNotification')
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(createNotif(content))
    timeoutID = setTimeout(() => {
      dispatch(createNotif(''))
    }, time * 1000)
  }
}

export default noteSlice.reducer
