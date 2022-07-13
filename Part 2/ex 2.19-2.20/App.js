import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const http = "http://localhost:3001/phonebook"

const Message = ({ message,errorPresent }) => {
  if (message === '') {
    return null
  }
  
  if (errorPresent === false)
  {
    return (
      <div className='message'>
      {message}
    </div>
    )
  }
  else {
  return (
    <div className='error'>
      {message}
    </div>
  )
}}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum,setNewNum] = useState('')
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState('')
  const [error, setError] = useState(null)
  const [copypersons,setCopypersons] = useState([])

  
  useEffect(()=> {axios.get(http).then(response=>{
    setPersons(response.data)
    setCopypersons(response.data)
    })
  },[])

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
    setCopypersons(filtered)
  }
  const handleNumchange = (event) => {
    console.log("Num: ",event.target.value)
    setNewNum(event.target.value)
  }
  const handleNamechange = (event) => {
    console.log("Name: ",event.target.value)
    setNewName(event.target.value)
    console.log("person is: ", persons)
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
    console.log("This is nameObject:",nameObject)

    axios.post(http,nameObject).then(response=>{
      console.log("This is persons:",persons)
      setPersons(persons.concat(response.data))
      setCopypersons(copypersons.concat(response.data))
      setNewName('')
      setNewNum('')
      setMessage(`Added ${newName}`)
      setError(false)
      setTimeout(()=>setMessage(null),3000)

    }).catch((err)=> {
      console.log("server responded with error: ",err)
    })

  }
  else {
    if (window.confirm( `${newName} is already added to phonebook,replace the old number with a new one?` )){
      const Find = persons.find(n=>n.name===newName)
      const url = `${http}/${Find.id}`
      const changedNum = {...Find, number: newNum}

      axios.put(url,changedNum).then(response=>{
        setPersons(persons.map(person=>person.id === Find.id? response.data:person))
        setNewName('')
        setNewNum('')
      }).catch (error=>{
        setMessage(`information of ${newName} has already been removed from server`)
        setError(true)
        setTimeout(()=>setMessage(null),3000)
      }

      )
      console.log("url is: ",url)
    }
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message = {message} errorPresent ={error}/>
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
      <Persons personz= {copypersons} setPersons = {setPersons} setCopypersons = {setCopypersons}/>
    </div>
  )
}

export default App

