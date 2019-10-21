import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
//import Weather from './components/Weather';

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleChange = (event) =>
    setFilter(event.target.value)

  const filteredCountries = filter.length > 0
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : countries
    
  return (
    <div>
      <Filter filter={filter} setFilter={handleChange} />

      <Countries countries={filteredCountries} setFilter={handleChange} />

    </div>
  )
}

export default App;