import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '07986504758' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

const Filter = ({ filter, handleFilterChange }) => {

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

const PersonForm = ({ addPerson, name, number }) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          value={name.newName}
          onChange={name.onChange}
          id="name"
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          value={number.newNumber}
          onChange={number.onChange}
          id="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {

  const rows = () => persons.map(person =>
    <div key={person.id}>{person.name} {person.number}</div>)

  const numbersToShow = () => {
    if (filter === '') {
      return (rows())
    } else {
      return (
        persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <div key={person.id}>{person.name} {person.number}</div>)
        //above .map method on the filter duplicates rows() method..
      )
    }
  }

  return (
    <div>
      {numbersToShow()}
    </div>
  )
}

export default App