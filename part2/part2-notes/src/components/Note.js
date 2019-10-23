import React from 'react'

const Note = ({ note, toggleImportance }) => {
  return (
    <div>
      <li>{note.content}
        <button onClick={toggleImportance}>Imp.</button>
      </li>
    </div>
  )
}

export default Note