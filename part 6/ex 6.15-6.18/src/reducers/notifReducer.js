import { createSlice } from '@reduxjs/toolkit'

var initialState = ['']
const noteSlice = createSlice({
    name: 'notif',
    initialState
    ,
    reducers: {
        createNotif(state,action){
            console.log('createNotif')
            if (action){
              console.log('action is: ',action)
            return (action.payload)
            }
            return state
        }
    }

})

export const { createNotif } = noteSlice.actions
export const setNotification = (content,time) => {
    return dispatch => {
      dispatch(createNotif(content))
      setTimeout(()=>{
        dispatch(createNotif(``))
        },time*1000)
    }
  
}
export default noteSlice.reducer