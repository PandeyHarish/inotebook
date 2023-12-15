import { useContext } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Note = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <>
      <div className="container my-4">
        <AddNote/>
        <h1>Your Notes</h1>
        <div className="row">
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
