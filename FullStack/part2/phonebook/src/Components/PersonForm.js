import React from 'react'

const PersonForm = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={addName}>
    <h2>add a new</h2>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={handleNumberChange}></input>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>  )
}

export default PersonForm