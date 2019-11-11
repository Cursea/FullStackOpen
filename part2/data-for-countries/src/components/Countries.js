import React from 'react';
import Country from './Country'
//import Weather from './Weather'

const Countries = ({ countries, showCountry }) => {

    if (countries.length === 0) {
        return <p>No country found</p>
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return (
        <div>
            {countries.map(country =>
                <div key={country.numericCode}>
                    {country.name}
                    <button value={country} onClick={() => showCountry(country.name)}>Show</button>
                </div>
            )}
        </div>
    )
}

export default Countries;