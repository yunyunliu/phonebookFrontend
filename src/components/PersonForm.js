import React from 'react';

const PersonForm = ({handleName, handleNumber, add}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleName} />
      </div>
      <div>number: <input onChange={handleNumber}/></div>
      <div>
        <button type="submit" onClick={add}>add</button>
      </div>
    </form>
  )
}

export default PersonForm;