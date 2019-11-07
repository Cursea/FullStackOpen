import React from 'react'

const Persons = ({ persons, filter, removePerson }) => {

  const rows = () => persons.map(person =>
    <div key={person.id}> {person.name} {person.number}
      <button className="delete-button" onClick={() => removePerson(person)}>delete</button>
    </div>)

  const numbersToShow = () => {
    if (filter === '') {
      return (rows())
    } else {
      console.log(persons)
      return (
        persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <div key={person.id}> {person.name} {person.number}
              <button className="dd" onClick={() => removePerson(person)}>delete</button>
            </div>)
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