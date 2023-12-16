import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // get all notes
  const getNotes = async () => {
    // api call

    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MzA2ZDBjNmY5MjcyNmM1ZjhhNDBjIn0sImlhdCI6MTcwMjEyNTU1OH0.In_mAVK3jKBfYcyjiAO7Xf3-JfFZH0YvtIiaVVhfIoM",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  //  add notes
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MzA2ZDBjNmY5MjcyNmM1ZjhhNDBjIn0sImlhdCI6MTcwMjEyNTU1OH0.In_mAVK3jKBfYcyjiAO7Xf3-JfFZH0YvtIiaVVhfIoM",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json();
      const { _id, user, __v } = data; // Assuming the API returns these properties for the new note

      const note = {
        _id,
        user,
        title,
        description,
        tag,
        __v,
      };

      setNotes((prevNotes) => [...prevNotes, note]);
      // Update the state using the functional form of setState to ensure you're working with the latest state
    } catch (error) {
      console.error("Error adding note:", error.message);
      // Handle error: show a message to the user, log, or perform necessary actions
    }
  };


  // update notes
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MzA2ZDBjNmY5MjcyNmM1ZjhhNDBjIn0sImlhdCI6MTcwMjEyNTU1OH0.In_mAVK3jKBfYcyjiAO7Xf3-JfFZH0YvtIiaVVhfIoM",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // delete notes
  const deleteNote = async (id) => {
const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MzA2ZDBjNmY5MjcyNmM1ZjhhNDBjIn0sImlhdCI6MTcwMjEyNTU1OH0.In_mAVK3jKBfYcyjiAO7Xf3-JfFZH0YvtIiaVVhfIoM",
  },
});
const json = response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
