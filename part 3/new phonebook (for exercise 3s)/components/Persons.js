import axios from "axios"
const Generator = ({person,setPersons, setCopypersons})=> {
    const name = person.name
    const id = person.id
    const DeleteContact = () => {
        if(window.confirm(`Delete ${name}?`)) {
            axios.delete(`/api/phonebook/${id}`)
    
            axios.get(`/api/phonebook/`).then(response=>{
                setPersons(response.data)
                setCopypersons(response.data)
                })
        }
    }
    return (
      <li>
        {name} {person.number}
        <button onClick = {()=>DeleteContact({name,id,setPersons, setCopypersons})}>Delete</button>
      </li>
    )
  }
const Persons = ({personz,setPersons, setCopypersons}) =>{
    return (
        <div>
            {personz.map(person=>
                <Generator key = {person.name} person = {person} setPersons = {setPersons} setCopypersons = {setCopypersons}/>
            )}
        </div>
    )
}

export default Persons