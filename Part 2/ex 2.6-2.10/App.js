import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum,setNewNum] = useState('')
  const [filter,setFilter] = useState('')

  const handleFilterchange = (event)=> {
    setFilter(event.target.value)
    console.log("filter is: ",filter)
    const filtered = persons.filter(function(person)
    {
      if (filter === ""){
        return person
      }
      else if (person.name.toLowerCase().match(filter.toLowerCase())) {
        
        return (console.log("person is: ",person),person)
      }
    })
    setPersons(filtered)
  }
  const handleNumchange = (event) => {
    console.log("Num: ",event.target.value)
    setNewNum(event.target.value)
  }
  const handleNamechange = (event) => {
    console.log("Name: ",event.target.value)
    setNewName(event.target.value)
    }

  const addNoteNum = (event)=> {
    event.preventDefault()
    var checker = persons.filter(person=> {
      return (person.name === newName)}
      )
    if (checker.length ===0){
    const nameObject = {
      name: newName,
      number: newNum
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
    console.log("This is persons:",persons)

  }
  else {
    alert( `${newName} is already added in the phonebook` )
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlefilter = {handleFilterchange}/>

      <h2>add a new</h2>
      <PersonForm 
        addNoteNum = {addNoteNum}
        namevalue={newName}
        numvalue = {newNum}
        handlename={handleNamechange}
        handlenum = {handleNumchange}
      />
  
      <h2>Numbers</h2>
      <Persons personz= {persons}/>
    </div>
  )
}

export default App