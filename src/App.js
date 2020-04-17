import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([ // person is an object!!!
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const handleChange = (e) => {
    // get value from events object
    // use set newName to change state newName to value
    const val = e.target.value;
    setNewName(val);
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App

// get app to render persons state

// add names to list: 
//1. text input will have an onChange handler to set user input to newName state
//2. button element will have an onClick handler that adds the value in newName //into the persons array
// array.map() used to render array of names