import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/actions'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, []) //second parameter of useEffect is [] to only run the effect along with first render of component

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    //check if person already exists in phonebook; search each key among persons objects for a match and returns Boolean
    if (persons.some(e => e.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else { //create new phonebook entry
      phonebookService
        .create(personObject)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add new entry</h3>

      <PersonForm
        addPerson={addPerson}
        name={{ newName: newName, onChange: handleNameChange }}
        number={{ newNumber: newNumber, onChange: handleNumberChange }}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filter={filter}
      />
    </div>
  )
}

export default App