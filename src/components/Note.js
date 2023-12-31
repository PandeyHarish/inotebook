import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  let history = useNavigate();
  const { notes, getNotes, editNote } = useContext(noteContext);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
  const { showAlert } = props;

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getNotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    editNote(note.id, note.edittitle, note.editdescription, note.edittag);
    showAlert("Note updated successfully", "success");
    closeModal();
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const updateNote = (curentNote) => {
    setNote({ id: curentNote._id, edittitle: curentNote.title, editdescription: curentNote.description, edittag: curentNote.tag });
  };
  return (
    <>
      <div className="container my-4">
        <EditModal showModal={showModal} closeModal={closeModal} handleFormSubmit={handleFormSubmit} onChange={onChange} note={note} />
        <AddNote showAlert={showAlert} />

        <h1>Your Notes</h1>
        <div className="container text-center ">
          <h4 className="my-20">{notes.length === 0 && "No notes to display"}</h4>
        </div>
        <div className="row row-cols-1 row-cols-md-3 ">
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} showAlert={showAlert} updateNote={updateNote} openModal={openModal} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
