import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { createNotif } from './notifReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const initialState = anecdotesAtStart.map(asObject)

const noteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increCount(state, action){
      const id = action.payload
      const anecToIncre = state.find(n=>n.id ===id)
      const increAnec = {
        ...anecToIncre,
        votes : anecToIncre.votes+1
      } //just let it be immutable first ba, no harm in that.
      const final = state.map(anec=>
        anec.id !== id ?anec : increAnec)
      return (
        final.sort((a,b)=> b.votes-a.votes)
        )
    },
    createAnec( state,action){ 
      const content = action.payload
      state.push({
        content,
        important: false,
        id: getId()
      })
    }
  }
})

export const {createAnec,increCount} = noteSlice.actions
export default noteSlice.reducer

/*
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCRE': {
      const id = action.data.id
      const anecToIncre = state.find(n=>n.id ===id)
      const increAnec = {
        ...anecToIncre,
        votes : anecToIncre.votes+1
      }

    return (state.map(anec=>
      anec.id !== id ?anec : increAnec))
    }
    case 'NEW_ANEC': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}
///action creators
export const increCount = (id) => {
  return{
    type: 'INCRE',
    data: {id: id}
  }

}

export const createAnec = (content)=> {
  return {
    type:'NEW_ANEC',
    data:{
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer
*/