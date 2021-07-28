import React, { useState, useEffect } from 'react'
import dataService from './services/data'


const Filter = ({persons, newSearchField, handleFilter}) =>{
  console.log('filter after add persons', persons)
  //const objs = persons.filter(person=>person.name.substring(0,newSearchField.length).toLowerCase()===newSearchField)
  const objs = persons.filter(person=>person.name.toLowerCase().includes(newSearchField.toLowerCase()))
  return(
    <div>
      filter shown with<input value={newSearchField} onChange={handleFilter}/>
      {objs.map(e=><p key={e.name}>{e.name} {e.number}</p>)}
    </div>
  )
}
const PersonForm = ({newName, newNumber, hNumChange, hNameChange, hAdd})=>{
  return (
    <form onSubmit={hAdd}>
      <div>
        name: <input 
        value={newName}
        onChange={hNameChange}
        />
      </div>
      <div>
        number: <input 
        value={newNumber}
        onChange={hNumChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Person = ({persons, handleDelete}) =>{
  return(
    <div>
    {persons.map((person,i)=>
    <DeleteButton key={i} person={person} handleDelete={()=>handleDelete(person)} />
    )}
    </div>
  )
}
const DeleteButton = ({person, handleDelete}) =>{
  console.log('click delete', person);
  return(
    <p>
      {person.name} {person.number}<button onClick={handleDelete}>delete</button>
    </p>
  )
}
const Notification = ({ message, style}) => {
  if (message === null) {
    return null
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}
const App = () => {
  const basic_style ={
    color: 'green',
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const error_style ={
    color: 'red',
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadiuss: 5,
    padding: 10,
    marginBottom: 10
  }
  const [ persons, setPersons ] = useState([
    /*{ name: 'Arto Hellas', number: '03-53555555'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }*/
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearchField, setSearchField ] = useState('')
  const [ Message, setMessage] = useState(null)
  const [ style, setStyle] = useState(basic_style)

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log('handleNameChange event target value', event.target.value)
    setNewName(event.target.value)
  }
  const handleAddButtom = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if (!persons.map(person=>person.name).includes(newName)){
      dataService
        .create(newPerson)
        .then(response=>
          {
            setMessage(
              `Added ${newPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setStyle(basic_style)
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
          }
        )
        .catch(error => {
          // this is the way to access the error message
          console.log('error', error.response.data)
          setMessage(
            `${JSON.stringify(error.response.data)}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setStyle(error_style)
          setNewName('')
          setNewNumber('')
        })
    }
    else{
      //window.alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const id = persons.filter(e=>e.name === newName)[0].id
        dataService
          .update(id, newPerson)
          .then(response=>{
            console.log('update response', response);
            setMessage(
              `Number of ${newPerson.name} has been updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setStyle(basic_style)
            setPersons(persons.map(e => e.id !== id ? e : response))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(
              `Information of ${newPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setStyle(error_style)
            setPersons(persons.filter(e => e.id !== id))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }
  const handleFilter = (event) =>{
    const filterStr = event.target.value.toLowerCase()
    setSearchField(filterStr)
  }
  const handleDelete = (person) =>{
    console.log('handle delete', person);
    if (window.confirm(`Delete ${person.name} ?`)) {
      dataService
      .remove(person.id)
      .then(response=>{
        setPersons(persons.filter(e=>e.id !== person.id))
        }
      )
    }
  }
  const hook = () => {
    console.log('effect')
   dataService
    .getAll()
    .then(response=>setPersons(response))
  }
  useEffect(hook,[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} style={style} />
      <Filter
      persons={persons}
      newSearchField={newSearchField} 
      handleFilter={handleFilter} 
      />
      <h2>Add a new</h2>
      <PersonForm newName={newName} 
      newNumber={newNumber}
      hNumChange={handleNumberChange}
      hNameChange={handleNameChange}
      hAdd={handleAddButtom}
      />
      <h2>Numbers</h2>
      <Person persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App