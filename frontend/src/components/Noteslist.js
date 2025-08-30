import React, { useEffect, useState } from "react";
import axios from "axios";
function Noteslist() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  return (
    <div>
      <h2>Notes List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <h3>{note.content}</h3>
            <small>{note.createdAt}</small>
            <small>{note.updatedAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Noteslist;