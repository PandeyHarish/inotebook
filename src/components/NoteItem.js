import React, { useContext } from "react";
import noteContext from "../context/notes/NotesContext";
import Deleteicon from "remixicon-react/DeleteBinLineIcon";
import Editicon from "remixicon-react/EditBoxLineIcon";
// import EditModal from "./EditModal";

const NoteItem = (props) => {
  const { note, openModal,updateNote,showAlert } = props;
  const { deleteNote } = useContext(noteContext);

  return (
    <>
      <div className=" cols g-4">
        <div className="card ">
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-top pl-20">
              <h5 className="card-title text-sm">{`${note.title.slice(0, 12)} . . .`}</h5>
              <div className="mt-auto">
                <Deleteicon
                  className="mx-3 mouse"
                  onClick={() => {
                    deleteNote(note._id);
                    showAlert("Note deleted successfully", "success");
                  }}
                />
                <Editicon
                  className="mouse"
                  onClick={() => {
                    openModal(); // Invoke the openModal function passed via props
                    updateNote(note);
                  }}
                />
              </div>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
