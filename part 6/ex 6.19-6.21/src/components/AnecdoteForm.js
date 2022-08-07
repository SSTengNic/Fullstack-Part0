import { connect } from 'react-redux'
import React from 'react'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'



const NewAnec = (props) => {
    const newAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.setNotification(`${content} has been added.`,5)
        props.createAnec(content)
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={ (event)=>newAnec(event)}>
          <input name = 'anec'/>
          <button type = 'submit'>create</button>
        </form>
      </div>
    )

}

const mapDispatchToProps = {
  createAnec,
  setNotification
}

export default connect(null, mapDispatchToProps )(NewAnec)