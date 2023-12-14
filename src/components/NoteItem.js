import React from "react";
import Deleteicon from "remixicon-react/DeleteBinLineIcon";
import Editicon from "remixicon-react/EditBoxLineIcon";

const NoteItem = (props) => {
  const { note } = props;

  return (
    <>
      <div className=" col-md-3 my-3">
        <div className="card ">
          <div className="card-body ">
            <div className="d-flex justify-content-between align-items-top pl-20">
              <h5 className="card-title text-sm">{`${note.title.slice(0,13)} . . .`}</h5>
              <div>
                <Deleteicon className="mx-3 mouse" />
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
