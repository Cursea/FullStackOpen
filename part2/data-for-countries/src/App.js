import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {

  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />
      {console.log(country)}
      <Countries filter={filter} country={country}/>
    </div>
  )
}

export default App;
