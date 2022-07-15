const http = require('http')
const express = require('express')
const morgan = require('morgan')
const { json, response } = require('express')

const app = express()
app.use(express.json())
//app.use(morgan('tiny')) use this and remove the morgan.token, for ex 3.7

morgan.token('body',(request,response)=>
  JSON.stringify(request.body)
)



phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const MaxId = ()=> {
    const maxId = phonebook.length >0? 
    Math.max(...phonebook.map(n=>n.id))
      :0

    return maxId
  }

app.get('/api/persons',(request,response)=> {
    response.json(phonebook)
   
})

app.get('/api/info', (request,response)=> {
    const maxId = MaxId()
    const date = new Date()
    response.send(`
    <div>Phonebook has info for ${maxId} people</div>
    <div>${date}</div>
    `)
    
})

app.get('/api/persons/:id',(request,response)=> {
    const id = Number(request.params.id)
    const filtered = phonebook.find(phonebooks=>phonebooks.id===id)
    if (filtered) {
        response.json(filtered)
    }
    else{
        response.status(400).end()
    }
})

app.delete('/api/persons/:id',(request,response)=> {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(phonebooks=>phonebooks.id!==id)

    response.status(204).end()
})

app.post('/api/persons',morgan(':method :url :status :res[content-length] - :response-time ms :body'),(request,response)=> {
  const body = request.body
  const sameName = phonebook.filter(phonebooks=>phonebooks.name === body.name)
  if (!body.name || !body.number){
    return response.status(400).json({error: 'content missing'})
  }
  else if(sameName.length !== 0) {
    return response.status(400).json({error: 'name must be unique'})

  }
  
  const newInput = {
    id: Math.floor(Math.random()*100),
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(newInput)
  response.json(phonebook)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)})