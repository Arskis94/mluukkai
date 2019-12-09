import React, { useState } from 'react'
import Note from './components/Note'

const Playground = (props) => {
  const [notes, setNotes] = useState(props.notes),
    [newNote, setNewNote] = useState("a new note..."),
    [showAll, setShowAll] = useState(true)

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
    />
  )

  const notesToShow = showAll ? notes : notes.filter(note=> note.important === true)

  const addNote = (e) => {
      e.preventDefault()
      const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important: Math.random() > 0.5,
          id: notes.length +1
      }
      setNotes(notes.concat(noteObject))
      setNewNote("")

  }

  const handleNoteChange = (e) => {
      setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
          <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? "important" : "all" }
          </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">save</button>
      </form>
    </div>
  )
}

export default Playground