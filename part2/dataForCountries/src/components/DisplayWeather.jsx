import countryService from '../services/getData'
import React, {useState, useEffect} from 'react'


const DisplayWeather = (props) => {
    // making get request for weather details
    const [weather, setWeather] = useState({})
    useEffect(() => {
        countryService
          .getWeatherDetails(props.city)
          .then(response => setWeather(response))
      }, [props.country])
    if(Object.keys(weather).length === 0) return null
    // console.log(weather)
    const temp = (weather.data.main.temp - 273).toFixed(2)
    const baseUrl = "https://openweathermap.org/img/wn/"
    const icon_url = baseUrl + weather.data.weather[0].icon + '@4x.png'
    // console.log(icon_url)
    return (
        <>
            <h1>Weather in {props.city}</h1>
            <p>temperature {temp} Celcius</p>
            <img src={icon_url} />
            <p>Wind {weather.data.wind.speed} m/s</p>
        </>
    )
}

export default DisplayWeather