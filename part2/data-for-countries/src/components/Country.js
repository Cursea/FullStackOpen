import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    //retrieve weather
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=4f8022b5b714698e39a011d2a53af96e&query=${country.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    //grid styling, 3 columns
    const gridParentStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr'
    }
    const flagStyle = {
        maxWidth: '600px',
        maxHeight: '400px'
    }

    function commaSepNums(num) {
        return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <section key={country.numericCode} style={gridParentStyle}>
            <div id="countryInfo">
                <h1>{country.name}</h1>
                <p>capital: {country.capital}</p>
                <p>population: {commaSepNums(country.population)}</p>
                <p>area: {commaSepNums(country.area)} km<sup>2</sup></p>
                <p>population density: {(country.population / country.area).toFixed(2)} per km<sup>2</sup></p>
                <h3>Langauges:</h3>
                <ul>
                    {country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
                </ul>
            </div>
            <div id="flag">
                <img src={country.flag} style={flagStyle} alt="national flag" />
            </div>
            <Weather weather={weather} />
        </section>
    )
}

export default Country