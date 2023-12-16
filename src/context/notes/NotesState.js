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
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MzA2ZDBjNmY5MjcyNmM1ZjhhNDBjIn0sImlhdCI6MTcwMjEyNTU1OH0.In_mAVK3jKBfYcyjiAO7Xf3-JfFZH0YvtIiaVVhfIoM",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();
    const note = {
      _id: "6575b007dd8fb2e9b382d3d8",
      user: "657306d0c6f92726c5f8a40c",
      title: title,
      description: description,
      tag: tag,

      __v: 0,
    };
    setNotes(notes.concat(note));
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
  const deleteNote = (id) => {
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
