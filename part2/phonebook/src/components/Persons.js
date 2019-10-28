import React from 'react'

const Persons = ({ persons, filter, remotePerson }) => {

  const rows = () => persons.map(person =>
    <div key={person.id}>{person.name} {person.number} <span><button onClick={remotePerson}>delete</button></span></div>)

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

export default Persons