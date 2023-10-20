import { useState, useEffect } from 'react'
import Display from './components/Display'
import personService from './services/persons'
import './index.css'

const objectEqualityCheck = (first, second) => {
  /*Check equality of objects. Return values as follows
    - 0: objects not equal
    - 1: name same but number different
    - 2: same object
  Note: first is object already stored, second is new object
  */
  
  let returnObject = {
    'value': 0,
    'id': -1
  }

  const al = Object.getOwnPropertyNames(first)
  const bl = Object.getOwnPropertyNames(second)

  // check if length equal
  if(al.length !== bl.length) return returnObject

  // check if keys match
  const hasAllKeys = al.every(value => !!bl.find(v => v === value))
  if(!hasAllKeys) return returnObject

  // check if name same but number different
  if(first['name'].trim() === second['name'].trim() && first['number'] !== second['number']){
    returnObject.value = 1
    returnObject.id = first['id']
    return returnObject
  }

  // check if value corresponding to each key is equal
  for(const key of al) if(key !== 'id' && first[key].trim() !== second[key].trim()) return returnObject

  returnObject.value = 2
  return returnObject
}

const Notification = ({message, type}) => {
  if(message === null) 
    return null
  const cssClass = type === 'success' ? 'notificationSuccess' : 'notificationFailure'
  return (
    <div className={cssClass}>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [alertMessage, setAlertMessage] = useState({message: null, type:'success'})
  // const [notificationType, setNotificationType] = useState('success')

  const initialReadHook = () => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }

  useEffect(initialReadHook, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterValue = (event) => {
    setFilterName(event.target.value)
  }

  const removeEntry = async id => {
    // using async and await as asynchronous call was not rerendering persons on update
    // console.log('inside removeEntry')
    // const data = await personService.getSingle(id)
    let data
    let caughtPromise = 0
    await personService
      .getSingle(id)
      .then(response => {
        // console.log(response)
        data = response
      })
      .catch(error => {
        caughtPromise = 1
        setAlertMessage({message: `Entry already deleted`, type:'failure'})
          setTimeout(() => {
            setAlertMessage({message:null, type:'success'})
          }, 5000)
      })
    // console.log(data)
    if(caughtPromise === 0 && window.confirm(`Do you really want to delete ${data.name} from your contact list`)){
      personService
        .deleteContact(id)
        .then(response => {
          setAlertMessage({message: `${data.name} successfully deleted`, type:'success'})
          setTimeout(() => {
            setAlertMessage({message:null, type:'success'})
          }, 5000)
        })
        .catch(error => {
          setAlertMessage({message: `Entry already deleted`, type:'failure'})
          setTimeout(() => {
            setAlertMessage({message:null, type:'success'})
          }, 5000)
        })
    }
    const updatedContacts = await personService.getAll()
    await setPersons(updatedContacts)
  }

  const addName = (event) => {
    // execute when submit pressed
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    // let flag = 0
    let objectCompObj = {'value':0, 'id':-1}
    persons.forEach((obj) => {
      if(objectCompObj.value === 0)
        objectCompObj = objectEqualityCheck(obj, entryObject)
      }
    ) 
    
    if(objectCompObj.value === 0){
      // entryObject is unique, add to database
      personService
        .create(entryObject)
        .then(newObject => {
          setPersons(persons.concat(newObject))
          setAlertMessage({message: `Added ${entryObject.name}`, type:'success'})
          setTimeout(() => {
            setAlertMessage({message: null, type: 'success'})
          }, 5000)
        })
        // .catch(error => {
          
        // })
    }
    else if(objectCompObj.value === 1){
      // new object has same name, but different number
      if(window.confirm(`${entryObject.name} is already added to phonebook, replace the old number with new one?`)){
        personService
          .update(objectCompObj.id, entryObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== objectCompObj.id ? person : returnedPerson))
            setAlertMessage({message: `Number changed for ${entryObject.name}`, type: 'success'})
            setTimeout(() => {
              setAlertMessage({message: null, type: 'success'})
            }, 5000)
          })
      }
    }
    else if(objectCompObj.value === 2){
      alert(`${entryObject.name} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage.message} type={alertMessage.type}/>
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
      <Display fname={filterName} directory={persons} removeEntry={removeEntry} />
    </div>
  )
}

export default App