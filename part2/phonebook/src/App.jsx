import { useState } from 'react'
import Display from './components/Display'

const objectEqualityCheck = (first, second) => {
  const al = Object.getOwnPropertyNames(first)
  const bl = Object.getOwnPropertyNames(second)

  // check if length equal
  if(al.length !== bl.length) return false

  // check if keys match
  const hasAllKeys = al.every(value => !!bl.find(v => v === value))
  if(!hasAllKeys) return false

  // check if value corresponding to each key is equal
  for(const key of al) if(key !== 'id' && first[key] !== second[key]) return false

  return true 
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterValue = (event) => {
    setFilterName(event.target.value)

  }

  const addName = (event) => {
    // execute when submit pressed
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    let flag = 0
    persons.forEach((obj) => {
      if(objectEqualityCheck(obj, entryObject)){
        flag = 1
      }
    })
    
    if(flag === 0)
      setPersons(persons.concat(entryObject))
    else{
      alert(`${entryObject.name} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filterName} onChange={handleFilterValue}/>
      <h2> Add new</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNewName}/> <br/>
          Number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display fname={filterName} directory={persons} />
    </div>
  )
}

export default App