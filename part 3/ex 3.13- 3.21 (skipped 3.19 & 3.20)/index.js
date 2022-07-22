require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/', (request, response) => {
  console.log('Helloooo')
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/phonebook', (request, response) => {
  console.log('hello world!!')
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/phonebook/:id', (request, response) => {
  Person.findById(request.params.id).then(persons => {
    response.json(persons)
  })
})


app.put('/api/phonebook/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


app.delete('/api/phonebook/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log('delete successful')
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*
const generateId = ()=> {
  const maxId = phonebook.length >0? 
  Math.max(...phonebook.map(n=>n.id))
    :0
  const note = request.body
  note.id = maxId+1
  return note.id
}*/

app.post('/api/phonebook/', (request, response,next) => {
  const body = request.body
  if (body.number === undefined || body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedperson => {
    response.json(savedperson)})
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log('hello world!')
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValiadationError') {
    return (
      console.log('hello world!'),
      response.status(400).json({error: error.message})
    )
  }

  next(error)
}
app.use(errorHandler)

const PORT= process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})