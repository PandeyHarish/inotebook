import React,{useContext} from "react";
import noteContext from "../context/notes/NotesContext";
import Deleteicon from "remixicon-react/DeleteBinLineIcon";
import Editicon from "remixicon-react/EditBoxLineIcon";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  return (
    <>
      <div className=" col-md-3 my-3">
        <div className="card ">
          <div className="card-body ">
            <div className="d-flex justify-content-between align-items-top pl-20">
              <h5 className="card-title text-sm">{`${note.title.slice(0,12)} . . .`}</h5>
              <div>
                <Deleteicon className="mx-3 mouse" onClick={()=>{deleteNote(note._id)}}/>
                <Editicon className="mouse"/>
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
