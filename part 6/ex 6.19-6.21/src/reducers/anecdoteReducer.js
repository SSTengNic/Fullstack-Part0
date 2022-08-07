import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const noteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increCount(state, action){
      const id = action.payload.id
      
      console.log('increcount action.data',action.payload)
      const filteredAnec = state.filter(n=>n.id !==id)
      console.log('filteredAnec,',filteredAnec)
      const newAnec = [
        ...filteredAnec,
        action.payload
      ]
      return (
        newAnec.sort((a,b)=> b.votes-a.votes)
        )
    },
    AppendAnec( state,action){ 
      const content = action.payload
      state.push(content)
    },
    setAnec(state,action){
      return (action.payload)
    }
  }
})

export const {AppendAnec,increCount,setAnec} = noteSlice.actions

export const initializeAnec = () => {
  return async dispatch => {
    const Anecs = await anecService.getAll() 
    dispatch(setAnec(Anecs))
  }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(AppendAnec(newAnec)) //this createAnec refers to the reducer, not the action creator.
  }
}

export const pushVotes = (updateAnec) => {
  return async dispatch => {
    const updatedAnec = await anecService.pushVotes(updateAnec)
    dispatch((increCount(updatedAnec)))
  }
}

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