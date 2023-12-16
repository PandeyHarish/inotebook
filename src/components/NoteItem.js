import React, { useContext } from "react";
import noteContext from "../context/notes/NotesContext";
import Deleteicon from "remixicon-react/DeleteBinLineIcon";
import Editicon from "remixicon-react/EditBoxLineIcon";
import EditModal from "./EditModal";

const NoteItem = ({ note }) => {
  const { deleteNote } = useContext(noteContext);
  const [showModal, setShowModal] = React.useState(false);

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
      <div className="">
        <div className="card ">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-top pl-20">
              <h5 className="card-title text-sm">{`${note.title.slice(0, 12)} . . .`}</h5>
              <div className="mt-auto">
                <Deleteicon
                  className="mx-3 mouse"
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                />
                <Editicon className="mouse" onClick={openModal} />
              </div>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
      <EditModal showModal={showModal} closeModal={closeModal} handleFormSubmit={handleFormSubmit} />
    </>
  );
};

export default NoteItem;
