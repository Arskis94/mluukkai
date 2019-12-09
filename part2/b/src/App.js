import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]),
    [newName, setNewName] = useState(""),
    [newNumber, setNewNumber] = useState("")

  const addNumber = (e) => {
    e.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    // if the e.target.value has already been declared alert "you idiot"

    setPersons(persons.concat(numberObject))
    setNewName(e.target[0].value)
    setNewNumber(e.target[1].value)
  }


  const populateList = () => persons.map(person => {
    return <li key={person.id}>{person.name} {person.number}</li>
  })

  const handleNameOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberOnChange = (e) => {
    setNewNumber(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input placeholder="name" required onChange={handleNameOnChange} />
        </div>
        <div>
          number: <input placeholder="number" required onChange={handleNumberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {populateList()}
      </ul>
    </div>
  )
}
export default App
