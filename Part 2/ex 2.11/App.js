import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'

const App = () => {
    const [person, setPersons] = useState([])

    useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
         })
      }, [])
      console.log('render', person.length, 'notes')

      return (
        <>
          <Persons personz={person}/>
        </>
      )
  // ...
}
export default App