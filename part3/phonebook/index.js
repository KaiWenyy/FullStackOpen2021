require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// morgan('combined') 
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
// morgan('tiny')
// :method :url :status :res[content-length] - :response-time ms
morgan.token('data', function (req, res){ 
  //console.log(res)
  //console.log(req)
  return JSON.stringify(req.body)
})
morgan.format('custom', '[custom] :method :url :status :res[content-length] - :response-time ms :data');
app.use(morgan('custom'))

let notes = [
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
// http://localhost:3001/api/persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})
app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    const string=`<h1>Phone book has info for ${people.length} people</h1>`
    const date = new Date()
    response.send(string+'<h2>'+date.toString()+'</h2>')
  })
})
app.get('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //const note = notes.find(note => note.id === id)
  Person.findById(request.params.id)
    .then(people => {
      if (people) {
        response.json(people)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //notes = notes.filter(note => note.id !== id)
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
app.post('/api/persons', (request, response, next) => {
  console.log('request header', request.headers)
  console.log('request body', request.body)
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().
    then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  /*if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  else{
    //note.id = Math.floor(Math.random() * 1000000000)
    //console.log('person id', note.id)
    //notes = notes.concat(note)
    //response.json(notes)
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }*/
})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  //receives a regular JavaScript object(person) as its parameter
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})  
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)