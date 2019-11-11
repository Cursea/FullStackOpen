import React from 'react';
import Weather from './Weather';

const Country = ({ country }) => {

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
            <Weather capital={country.capital}/>
        </section>
    )
}

export default Country