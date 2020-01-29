import React from 'react'

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

export default Filter