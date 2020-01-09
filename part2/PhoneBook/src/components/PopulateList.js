import React from "react"

const PopulateList = ({ persons, filterName, deletePerson }) => {
    const list = persons
        .filter(person => filterName === "" || person.name.toLowerCase().includes(filterName.toLowerCase()))
        .map(person =>
            person.isActive ?
                <li key={person.id}>
                    {person.name} {person.number} <button id={person.id} value={person.name} onClick={() => deletePerson(person.id)} type="button">delete</button>
                </li>
                : "")

    return (
        <ul>
            {list}
        </ul>
    )
}

export default PopulateList