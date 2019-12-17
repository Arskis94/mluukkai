import React from "react"


const PersonsForm = ({ addNumber, newName, newNumber, handleNameOnChange, handleNumberOnChange }) => {
    return (
        <div>
            <form onSubmit={addNumber}>
                <div>
                    Name: <input value={newName} placeholder="name" required onChange={handleNameOnChange} />
                </div>
                <br />
                <div>
                    Number: <input value={newNumber} placeholder="number" required onChange={handleNumberOnChange} />
                </div>
                <br />
                <div>
                    <button type="submit">add</button>
                </div>
                <br />
            </form>
        </div>
    )
}

export default PersonsForm