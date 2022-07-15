const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let phonebook = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "9079789"
    },
    {
      "id": 2,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "name": "Hello World",
      "number": "12343",
      "id": 3
    },
    {
      "name": "asd",
      "number": "1134",
      "id": 4
    },
    {
      "name": "asdddd",
      "number": "1231",
      "id": 5
    }
  ]

      
app.get('/', (request, response) => {
    console.log("Helloooo")
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/phonebook', (request, response) => {
  response.json(phonebook)
})

app.get('/api/phonebook/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  console.log("testing")
  console.log(request.headers)
  const phonebooks = phonebook.find(phonebooks=> phonebooks.id ===id)
  if (phonebooks) {
    response.json(phonebooks)
  }
  else {
    response.status(400).end()
  }
})

app.delete('/api/phonebook/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = ()=> {
  const maxId = phonebook.length >0? 
  Math.max(...phonebook.map(n=>n.id))
    :0
  const note = request.body
  note.id = maxId+1
  return note.id


}

app.post('/phonebook/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const phonebookContent = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

phonebooks = phonebook.concat(phonebookContent)
response.json(phonebooks)
  })

  const { PORT=3001, LOCAL_ADDRESS='0.0.0.0' } = process.env
  app.listen(PORT, LOCAL_ADDRESS, () => {
    console.log(`Server running on port ${PORT}`)
  })