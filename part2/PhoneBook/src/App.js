import React, { useState, useEffect } from 'react'
import PopulateList from "./components/PopulateList.js"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from "./services/persons"

const App = () => {
  const [newName, setNewName] = useState(""),
    [newNumber, setNewNumber] = useState(""),
    [filterName, setFilterName] = useState(""),
    [persons, setPersons] = useState([]),
    [confirmMessage, setConfirmMessage] = useState(null),
    [errorMessage, setErrorMessage] = useState(null),
    uuidv1 = require("uuid/v1")

  const Notification = ({ message, error }) => {
    let style
    if (message) {
       style = "confirm"
    }

    if(error) style = "error"

    return (
      <div className={style}>
        {error}
        {message}
      </div>

    )
  }

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
      confirmed = window.confirm(`Are you sure you want to delete ${changedPerson.name}`)

    if (confirmed) {
      personService
        .deletePerson(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setConfirmMessage(`${person.name} has been deleted successfully`)
          setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setConfirmMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`The person ${person.name} was already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addNumber = e => {
    e.preventDefault()

    for (let i = 0; i < persons.length; i++) {
      if (e.target[0].value === persons[i].name) {
        const confirmed = window.confirm(`${persons[i].name} is already added to phonebook, would you like to replace the old number with a new one?`)
        if (confirmed) {
          const id = persons[i].id,
            person = persons.find(p => p.id === id),
            changedPerson = { ...person, number: e.target[1].value }
          personService
            .update(id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              setConfirmMessage(`Number has been changed for ${person.name}`)
              setTimeout(() => {
                setConfirmMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Something went wrong and we couldn't add ${person.name} to list`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
          return
        }
        else {
          return
        }
      }
    }

    const numberObject = {
      name: newName,
      number: newNumber.toString(),
      isActive: true,
      id: uuidv1()
    }

    personService
      .create(numberObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setConfirmMessage(`${returnedPerson.name} has been successfully added to list`)
        setTimeout(() => {
          setConfirmMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Something went wrong and we couldn't add ${numberObject.name} to list`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }


  const searchName = (e) => {
    setFilterName(e.target.value)
  }

  const handleNameOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberOnChange = (e) => {
    setNewNumber(e.target.value)
    console.log(newNumber)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={confirmMessage} error={errorMessage} />
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
