import React from 'react';

const Weather = ({ weather }) => {

    //required null check to stop app blowing up on initial weather api call
    if (weather === null) {
        return null
    }

    return (
        <div id="weather">
            <p>Weather in {weather.location.name}<br /> as of {weather.location.localtime}</p>
            <p>Temperature: {weather.current.temperature}°C</p>
            <p>Wind: {weather.current.wind_speed}kph direction {weather.current.wind_dir}</p>
            <img src={weather.current.weather_icons} alt="weather in capital city" />
        </div>
    )
}

export default Weather