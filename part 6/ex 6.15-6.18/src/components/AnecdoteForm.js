import { useDispatch, useSelector } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import anecService from '../services/anecdotes'

const NewAnec = () => {

    const dispatch = useDispatch()

    const newAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        dispatch(createAnec(content))
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={ newAnec}>
          <input name = 'anec'/>
          <button type = 'submit'>create</button>
        </form>
      </div>
    )
}

export default NewAnec