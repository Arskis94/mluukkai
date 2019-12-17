import React, { useState, useEffect } from 'react'
import PopulateList from "./components/PopulateList.js"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from "./services/persons"

const App = () => {
  const [newName, setNewName] = useState(""),
    [newNumber, setNewNumber] = useState(""),
    [filterName, setFilterName] = useState(""),
    [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = id => {
    const person = persons.find(p => p.id === id),
      changedPerson = { ...person, isActive: !person.isActive },
      confirmed = window.confirm(`Are you sure you want to delete ${changedPerson.name}`) ?


        personService
          .deletePerson(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch(error => {
            alert(`The person ${person.name} was already been deactivated from the server`)
            setPersons(persons.filter(p => p.id !== id))
          })

        : ""
  }

  const addNumber = (e, id) => {
    e.preventDefault()

    // for (let i = 0; i < persons.length; i++) {
    //   if (e.target[0].value === persons[i].name) {
    //     alert(`${persons[i].name} is already added to phonebook, would you like to replace the old number with a new one?`)
    //     return
    //   }

    const person = persons.find(p => p.id === id),
      changedPerson = { ...person, number: e.target[1].value },
      confirmed = window.confirm(`Update the number`) ?
        personService.update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            return
          })
        : ""

    const numberObject = {
      name: newName,
      number: newNumber.toString(),
      isActive: true,
      id: persons.length + 1
    }

    personService
      .create(numberObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => console.log(error))
  }


  const searchName = (e) => {
    setFilterName(e.target.value)
  }

  const handleNameOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberOnChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} filterName={filterName} />
      <h2>Add a new</h2>
      <PersonForm addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
        handleNameOnChange={handleNameOnChange}
        handleNumberOnChange={handleNumberOnChange}
      />
      <h2>Numbers</h2>
      <PopulateList
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </div>
  )
}
export default App
