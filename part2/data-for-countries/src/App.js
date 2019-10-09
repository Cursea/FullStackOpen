import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />

      <Countries filter={filter} />
    </div>
  )
}

export default App;
