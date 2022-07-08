const Generator = ({persons})=> {
    return (
      <li>
        {persons.name} {persons.number}
      </li>
    )
  }

const Persons = ({personz}) =>{
    return (
        <div>
            {personz.map(person=>
                <Generator key = {person.name} persons = {person}/>
            )}
        </div>
    )
}

export default Persons