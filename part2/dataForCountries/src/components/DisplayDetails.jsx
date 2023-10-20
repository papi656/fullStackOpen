import countryService from '../services/getData'
import React, {useState, useEffect} from 'react'
import DisplayWeather from './DisplayWeather'

const DisplayDetails = (props) => {
    if(props.country === null) return null
    const [cDetails, setCDetails] = useState({})

    // making get request for country details
    useEffect(() => {
      countryService
        .getCountryDetails(props.country)
        .then(response => {
          setCDetails(response)})
        .catch(error => console.error('error', error))
    }, [props.country])
  
    if(Object.keys(cDetails).length === 0 || props.country === null)
        return null

       

    return (
      <>
        <h1>{cDetails.name.common}</h1>
        <p><strong>Capital</strong> {cDetails.capital}</p>
        <p><strong>Area</strong> {cDetails.area}</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {Object.entries(cDetails.languages).map(([key, value]) =>( 
             <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={cDetails.flags.svg} alt={cDetails.flags.alt} width="300" height="200" />

        <DisplayWeather city={cDetails.capital} country={props.country}/>
      </>
    )
}

export default DisplayDetails