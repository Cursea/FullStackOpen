import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/actions'
import Notification from './components/Notificaion'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(true)

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
      name: newName,
      number: newNumber
    }

    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase() && e.number === newNumber)) {
      window.alert(`${newName} is already added to the phonebook`)
      return 0
    }

    //check person exists in phonebook; search keys among persons for match; return Boolean
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase()) && newNumber !== null) {
      if (window.confirm(`Update the number for ${newName}?`)) {
        let existingPerson = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())
        phonebookService
          .update(existingPerson[0].id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson[0].id ? person : response))
            setNewName('')
            setNewNumber('')
            //5 sec notification message
            setErrorMessage(`Updated record for ${newName}`)
            setSuccess(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Cannot update: ${newName} has already been removed from the server. ${error}`)
            setSuccess(false)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else { //create new phonebook entry
      phonebookService
        .create(personObject)
        .then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${newName} to the phonebook`)
          setSuccess(true)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name} from the phonebook?`)) {
      phonebookService
        .remove(personToRemove.id)
        .then(
          setPersons(persons.filter(persons => persons.id !== personToRemove.id)),
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} success={success} />

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
        removePerson={removePerson}
        filter={filter}
      />
    </div>
  )
}

export default App