import { useDispatch, useSelector } from 'react-redux'
import { increCount } from '../reducers/anecdoteReducer'
import { createNotif } from '../reducers/notifReducer'

const Anecdote =({ anecdote, handleClick }) => {
  return(
    <div>
      <p>
        {anecdote.content}
      </p>
      <p>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </p>
    </div>
  )

}


const Anecdotes = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state=>{
    if (state.filter ===''){
      return state.anecdote
    }
    return (
      state.anecdote.filter(anecdote=>anecdote.content.includes(state.filter))
    )
  })

  

  const VoteandNotif = (anecdote) => {
    dispatch(increCount(anecdote.id))
    dispatch(createNotif(`you voted ${anecdote.content}`))
    setTimeout(()=>{
      dispatch(createNotif(``))
    },5000)
    
  }

  console.log ('this is anecdotes',anecdotes)

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key = {anecdote.id}
          anecdote = {anecdote}
          handleClick= {() => VoteandNotif(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes