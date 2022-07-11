import axios from "axios"
import {useState} from 'react'


const Generator = ({person,setPersons})=> {
    const name = person.name
    const id = person.id
    const DeleteContact = () => {
        if(window.confirm(`Delete ${name}?`)) {
            axios.delete(`http://localhost:3001/phonebook/${id}`)
    
            axios.get(`http://localhost:3001/phonebook/`).then(response=>{
                setPersons(response.data)
                window.location.reload(true)
                })
            
        }
    }


    return (
      <li>
        {name} {person.number}
        <button onClick = {()=>DeleteContact({name,id,setPersons})}>Delete</button>
      </li>
    )
  }



const Persons = ({personz,setPersons}) =>{
    return (
        <div>
            {personz.map(person=>
                <Generator key = {person.name} person = {person} setPersons = {setPersons}/>
            )}
        </div>
    )
}

export default Persons