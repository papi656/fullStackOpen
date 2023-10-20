import { useEffect, useState } from 'react'
import countryService from './services/getData'
import DisplayDetails from './components/DisplayDetails'



const Display = (props) => {
  if(props.countryData.length === 0) return null
  const matches = props.countryData
    .filter(country => {
      return (
        country.toLowerCase().includes(props.inputName.toLowerCase().trim())
      )
    })
    .map(country => {
        return country
    })
  
  if(matches.length === 0) return null
  if(matches.length > 10){
    return (
      <>
        <p>Too many matches, specify another filter </p>
      </>
    )
  }
  else if(matches.length <= 10){
    return (
      <>
        <ul>
          {matches.map((match, index) => {
            return (
                <li key={index}>
                  {match} <button onClick={() => props.setDisplayName(match)}>show</button>
                </li>
            )
          })}
        </ul>
      </>
    )
  }

}

const App = () => {
  const [countryNames, setCountryNames] = useState([])
  const [currentName, setName] = useState('')
  const [displayCountryName, setDisplayCountryName] = useState(null)
  

  const getCountryNames = () => {
    countryService
      .getAll()
      .then(response => {
        const countryNamesArray = response.map(item => item.name.common)
        setCountryNames(countryNamesArray)
      })
  }
  useEffect(() => {getCountryNames()}, [])

  const changeDisplayCountry = (name) => {
    setDisplayCountryName(name)
  }

  const handleCountryName = (event) => {
    setName(event.target.value)
    changeDisplayCountry(null)
  }

  

  return (
    <>
      find countries <input value={currentName} onChange={handleCountryName} /> 
      <Display countryData={countryNames} inputName={currentName} setDisplayName={changeDisplayCountry}/>
      <DisplayDetails country={displayCountryName} />
    </>
  )
}

export default App
