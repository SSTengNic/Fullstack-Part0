import Anecdotes from './components/Anecdotes'
import NewAnec from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <NewAnec/>
    </div>
  )
}

export default App