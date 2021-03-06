import React from 'react'

const PersonForm = ({ addPerson, name, number }) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          value={name.newName}
          onChange={name.onChange}
          id="name"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          value={number.newNumber}
          onChange={number.onChange}
          id="number"
          autoComplete="off"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm