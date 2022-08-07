import Anecdotes from './components/Anecdotes'
import NewAnec from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/FilterForm'
import store from './store'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'
import anecService from './services/anecdotes'
import { initializeAnec, setAnec } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(initializeAnec())
  },[dispatch])

  console.log('this is store: ',store.getState())

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <Anecdotes/>
      <NewAnec/>
    </div>
  )
}

export default App