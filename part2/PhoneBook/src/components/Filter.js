import React from "react"

const Filter = ({ searchName, filterName }) => {
    return (
        <div>
            <h2>Search</h2>
            Search: <input value={filterName} onChange={searchName}></input>
        </div>
    )
}

export default Filter