const PersonForm = ({namevalue,numvalue,handlename,handlenum,addNoteNum})=> {
    return (
        <form onSubmit={addNoteNum}>
            <div>
                name: <input 
                value = {namevalue}
                onChange = {handlename}
                />
            </div>
            <div>
                <input
                    value = {numvalue}
                    onChange = {handlenum}
                />
            </div>
            <button type="submit">add</button>
        </form>
    )

}

export default PersonForm