import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const noteSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setfilter(state,action){
            const content = action.payload
            console.log('content is: ',content)
            return(content)
        }
    }


})

export const {setfilter} = noteSlice.actions
export default noteSlice.reducer