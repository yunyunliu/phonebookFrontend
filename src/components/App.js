import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import personsServices from '../services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [message, setMessage] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const hook = () => {
    personsServices.getAll()
      .then(data => {
        setPersons(data);
      });
  };

  useEffect(hook, []);

  const handleChangeName = e => {
    // get value from events object
    // use set newName to change state newName to value
    const val = e.target.value;
    setNewName(val);
  };

  const handleChangeNumber = e => {
    const val = e.target.value;
    setNewNumber(val);
  }
  
  const handleChangeFilter = e => { 
    const term = e.target.value.toLowerCase();
    console.log(term);
    setSearchTerm(term);
    const results = persons.filter(person => {
      let name = person.name.toLowerCase();
      // let number = person.number; // number should already be a string
      return name.includes(term);
    });
    setFilteredResults(results);
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsServices.deleteEntry(person.id)
      .then(() => {
        const updated = persons.filter(p => p.name !== person.name);
        setPersons(updated);
        setMessage(`${person.name} successfully deleted`);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      });
    }
  };

  const addPerson = (e) => {
    e.preventDefault(); // default behavior of button type=submit is to reload page
    const newPerson = {name: newName, number: newNumber};
    personsServices.create(newPerson)
      .then(created => {
        const updated = persons.concat(created);
        setPersons(updated); 
        setMessage(`added ${created.name}`);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      .catch(err => {
        console.log('this is the error', err.response.data.error, typeof err.response.data.error)
        setMessage('ERROR: ' + err.response.data.error);
        setTimeout(() => {
          setMessage('');
        }, 5000)
      }); 
      // const duplicate = filtered[0];
      // if (window.confirm(`${duplicate.name} is already added to phonebook, replace old number with a new one?`)) {
      //   const newEntry = {...duplicate, number: newNumber};
  
      //   personsServices.update(duplicate.id, newEntry)
      //     .then(updated => {
      //       console.log('modified entry:', updated);
      //       const updatedPersons = persons.map(person => {
      //         if (person.id !== updated.id) { // if 
      //           return person;
      //         } else {
      //           return updated;
      //         }
      //       });
      //       setPersons(updatedPersons);
      //       setMessage(`changed phone number for ${updated.name}`);
      //       setTimeout(() => {
      //         setMessage('');
      //       }, 5000);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       setMessage(`ERROR: ${newEntry.name} has already been deleted from the server`)
      //     });   
      // }
      setNewName(''); // clears newName after persons is updated, so clicking add again will not add the same name again
    } 

  let phonebook;
  if (searchTerm === '') { 
    phonebook = persons.map(person => {
      return (
        <p key={person.name}>
          {person.name} {person.number}
          <input type="button" value="delete" onClick={() => handleDelete(person)}/>
        </p>);
    });
  } else {
    phonebook = filteredResults.map(result => {
      return (
        <p key={result.name}>
          {result.name} {result.number}
          <input type="button" value="delete" onClick={() => handleDelete(result.id)}/> 
        </p>);
  });
}

  return (
    <div>
      {/* <div> debug: 
      persons: {JSON.stringify(persons)} <br />
      filtered: {JSON.stringify(filteredResults)} <br />
      </div> */}
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleChangeFilter}/>
      <h2>add new</h2>
      <PersonForm handleName={handleChangeName} handleNumber={handleChangeNumber} add={addPerson} />
     
      <h2>Numbers</h2>
      <Persons persons={phonebook} />
    </div>
  )
}

export default App;

//step 5 debugging: 
  // filteredResults.length === 0 is a bad condition for conditonal rendering because the results array is empty is nothing has been entered into the input area and if no results are found....a better condition is input value === '' since that would mean no input at all
    //the only way to access the value of the filter input box is search term is a state again

// debugging 2.9, step4: // problem:  state filtered is not up to date with the user input (is one letter behind)
  // examine where setSearchTerm amd setFilteredResults are and identify where re-renders are happening
    //results: filtering works when search term is removed from being a state; state change is happening after render?

// 2.9 add filter functionality; user input in text box, determines whech person objects in persons array to render
  // add new state of results after filtering
  //add new state to keep track of results of filtering
  // add onChange handler to synchronize user input to state
  // filter logic
    // convert searchTerm to lowercase
    // use array.filter
      // test: does search term occur as substring in person.name or person.number..use String.includes()
// filtering happens onChange so filtering logic should be inside handleChangeFilter
// add condition to determine whether to render persons array or the filtered results...condition: if input for filter is emply...?

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