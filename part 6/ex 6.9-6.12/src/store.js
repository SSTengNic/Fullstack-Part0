import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        notification: notifReducer,
        filter: filterReducer
    }
})

export default store