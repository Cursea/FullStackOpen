import React from 'react';

const Countries = ({ country, filter, weather }) => {

    function commaSepNums(num) {
        return (num + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const countryInfo = () => {
        const gridParentStyle = {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr'
        }
        const flagStyle = {
            maxWidth: '600px',
            maxHeight: '400px'
        }

        if (filter == '') {
            return ''
        } else {
            return country
                .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
                .map(country =>
                    <section key={country.numericCode} style={gridParentStyle}>
                        <div>
                            <h1>{country.name}</h1>
                            <p>capital: {country.capital}</p>
                            <p>population: {commaSepNums(country.population)}</p>
                            <p>area: {commaSepNums(country.area)}</p>
                            <p>population density: {(country.population / country.area).toFixed(2)} per km<sup>2</sup></p>
                            <h3>Langauges:</h3>
                            <ul>
                                {country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
                            </ul>
                        </div>
                        <div>
                            <img src={country.flag} style={flagStyle} />
                        </div>
                        <div>
                            <p>Weather in {weather.location.name}<br /> as of {weather.location.localtime}</p>
                            <p>Temperature: {weather.current.temperature}°C</p>
                            <p>Wind: {weather.current.wind_speed}kph direction {weather.current.wind_dir}</p>
                            <img src={weather.current.weather_icons} />
                        </div>
                    </section>
                )
        }
    }

    return (
        <div>
            {countryInfo()}
        </div>
    )
}

export default Countries