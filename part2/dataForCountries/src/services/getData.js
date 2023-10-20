import axios from 'axios'
// import 'dotenv/config'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

// for openWeatherMap api
const openWeather_api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
// const openWeather_api_key = process.env.openWeather_api_key
const weather_baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
// console.log(openWeather_api_key)


const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    // console.log("getAll)")
    return request.then(response => response.data)
}

const getCountryDetails = (name) => {
    const request = axios.get(`${baseUrl}/api/name/${name}`)
    // console.log('reach')
    return request.then(response => response.data)
}

const getWeatherDetails = (city) => {

    const request = axios.get(`${weather_baseUrl}q=${city}&appid=${openWeather_api_key}`)
    return request.then(response => response)
}

export default {getAll, getCountryDetails, getWeatherDetails}