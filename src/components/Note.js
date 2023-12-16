import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditModal from "./EditModal";

const Note = () => {
  const { notes, getNotes } = useContext(noteContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNotes();
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

    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const tag = event.target.elements.tag.value;

    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Tag:", tag);

    closeModal();
  };

  return (
    <>
      <EditModal showModal={showModal} closeModal={closeModal} handleFormSubmit={handleFormSubmit} />
      <div className="container my-4">
        <AddNote />
        <h1>Your Notes</h1>
        <div className="row row-cols-1 row-cols-md-3 ">
          {notes.map((note) => {
            return <NoteItem note={note} key={note._id} openModal={openModal} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
