import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {

  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //retrieve countries
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  //retrieve weather
  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=4f8022b5b714698e39a011d2a53af96e&query=London')
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  console.log({ weather })
  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />

      <Countries filter={filter} country={country} weather={weather} />
    </div>
  )
}

export default App;
