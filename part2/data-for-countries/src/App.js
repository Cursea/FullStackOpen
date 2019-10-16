import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountry] = useState('')
  const [weather, setWeather] = useState('')

  const showCountry = (name) => {
    setFilter(name);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //retrieve countries; sets a massive JSON blob to 'country'
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
      .get('http://api.weatherstack.com/current?access_key=4f8022b5b714698e39a011d2a53af96e&query=London') //http://api.weatherstack.com/current?access_key=4f8022b5b714698e39a011d2a53af96e&query=London
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={handleFilterChange} />

      <Countries filter={filter} countries={countries} weather={weather} showCountry={showCountry} />
    </div>
  )
}

export default App;
