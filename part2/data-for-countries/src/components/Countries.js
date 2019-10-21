import React from 'react';
//import Weather from './Weather'

const Countries = ({ countries, filter, setFilter, countryList }) => {

    function commaSepNums(num) {
        return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    //some styling
    const gridParentStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr'
    }
    const flagStyle = {
        maxWidth: '600px',
        maxHeight: '400px'
    }

    const info = (countries) => {
        return (
            <section key={countries.numericCode} style={gridParentStyle}>
                <div id="countriesInfo">
                    <h1>{countries.name}</h1>
                    <p>capital: {countries.capital}</p>
                    <p>population: {commaSepNums(countries.population)}</p>
                    <p>area: {commaSepNums(countries.area)}</p>
                    <p>population density: {(countries.population / countries.area).toFixed(2)} per km<sup>2</sup></p>
                    <h3>Langauges:</h3>
                    <ul>
                        {countries.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
                    </ul>
                </div>
                <div id="flag">
                    <img src={countries.flag} style={flagStyle} alt="national flag" />
                </div>
            </section>
        )
    }

    if (countries.length === 0) {
        return
    } else {
        if (countries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (countries.length === 1) {
            return countries
                .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
                .map(countries => info(countries)
                )
        } else {
            return countries
                .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
                .map(country =>
                    <div key={country.numericCode}>
                        <p style={{ display: "inline", paddingRight: "5px" }}>{country.name}</p>
                        <button value={country} onClick={() => setFilter(country.name)}>Show</button>
                    </div>
                )
        }
    }

    return (
        <div>
            {countries.map(country =>
                <div key={country.numericCode}>
                    {country.name}
                    <button value={country} onClick={() => setFilter(country.name)}>Show</button>
                </div>
            )}
        </div>
    )
}

export default Countries