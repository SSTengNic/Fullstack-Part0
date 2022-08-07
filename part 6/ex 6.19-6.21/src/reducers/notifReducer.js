import { createSlice } from '@reduxjs/toolkit'

var initialState = ['']
const noteSlice = createSlice({
    name: 'notif',
    initialState
    ,
    reducers: {
        createNotif(state,action){
            if (action){
            return (action.payload)
            }
            return state
        }
    }

})

export const { createNotif } = noteSlice.actions

let timeoutID
export const setNotification = (content,time) => {
    return dispatch => {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
        dispatch(createNotif(content))
        timeoutID = setTimeout(()=>{
        dispatch(createNotif(``))
        },time*1000)
    }
  
}
export default noteSlice.reducer