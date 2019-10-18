import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Weather from './components/Weather';

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountry] = useState('')

  //retrieve countries; sets a massive JSON blob to 'country'
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  const showCountry = (name) => {
    setFilter(name);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />

      <Countries filter={filter} countries={countries} showCountry={showCountry} />

      <Weather capital={capital} />
    </div>
  )
}

export default App;