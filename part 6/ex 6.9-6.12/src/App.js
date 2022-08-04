import Anecdotes from './components/Anecdotes'
import NewAnec from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/FilterForm'
import store from './store'

const App = () => {
  
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