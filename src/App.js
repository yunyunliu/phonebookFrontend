import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([ // person is an object!!!
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ number, setNumber ] = useState(null);
  
  const handleChangeName = (e) => {
    // get value from events object
    // use set newName to change state newName to value
    const val = e.target.value;
    setNewName(val);
  };

  const handleChangeNumber = (e) => {
    const val = e.target.value;
    setNumber(val);
  }

  const addPerson = (e) => {
    e.preventDefault(); // default behavior of button type=submit is to reload page
    const filtered = persons.filter(p => p.name === newName);
    if (filtered.length === 0) {
      const newPerson = {name: newName};
      const updated = persons.concat(newPerson);
      setPersons(updated); 
    } else {
        alert(`${newName} is already added to phonebook`);
    }
    setNewName(''); // clears newName after persons is updated, so clicking add again will not add the same name again
  }

  return (
    <div>
      <div>debug: {number} persons: {JSON.stringify(persons)}</div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChangeName} />
        </div>
        <div>number: <input onChange={handleChangeNumber}/></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
     {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App;

//2.8 add ability to add a phone number with name
// new input element/textbox
// new piece of state to keep track of number input
// onChange handler on input tag to synchronize state to input
// onclick handler to add name and number to persons list
  // since there's one button for box text boxes add inClick handler to form element?

// 2.7 add data validation: in addPerson use array.includes to check if user input already exists in persons

// get app to render persons state: use array.map() used to render array of names

// add names to list: 
//1. text input will have an onChange handler to set user input to newNamestate 
//2. button element will have an onClick handler that adds the value in newName //into the persons array
//  - handler wraps newName in an object and then concats it to persons. then handler users setPersons to set concatenated array as state. then clears textbox