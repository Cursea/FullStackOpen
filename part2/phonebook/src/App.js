import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '07986504758'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const rows = () => persons.map(person =>
    <div key={person.id}>{person.name} {person.number}</div>)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    //check if person already exists in phonebook; search each key among persons objects for a match and returns Boolean
    if (persons.some(e => e.name === newName)) {
      window.alert(`${personObject.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>Add new entry</h3>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            value={newName}
            onChange={handleNameChange}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="number">Number: </label>
          <input
            value={newNumber}
            onChange={handleNumberChange}
            id="number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>

  )
}

const Filter = () => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h3>Filter phonebook</h3>
      <label htmlFor="filter">Filter names: </label>
      <input
        value={filter}
        onChange={handleFilterChange}
        id="filter"
      />
    </div>
  )
}

export default App