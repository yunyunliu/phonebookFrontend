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

  const addPerson = (e) => {
    e.preventDefault(); // default behavior of button type=submit is to reload page
    const newPerson = {name: newName};
    const updated = persons.concat(newPerson);
    setPersons(updated);
  }

  return (
    <div>
      <div>debug: {JSON.stringify(persons)}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App

// get app to render persons state: use array.map() used to render array of names

// add names to list: 
//1. text input will have an onChange handler to set user input to newNamestate 
//2. button element will have an onClick handler that adds the value in newName //into the persons array
//  - handler wraps newName in an object and then concats it to persons. then handler users setPersons to set concatenated array as state. then clears textbox