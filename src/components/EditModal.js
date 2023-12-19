import React,{useContext} from "react";
import noteContext from "../context/notes/NotesContext";
import "../css/index.css"; 


const EditModal = (props) => {
   const { notes, getNotes} = useContext(noteContext);
  const { showModal, closeModal, handleFormSubmit, onChange, note } = props;
  const handleCloseModal = () => {
    closeModal(); // Call the closeModal function passed via props
  };

  const handleSubmit = (event) => {
    handleFormSubmit(event); // Call the handleFormSubmit function passed via props
    
  };

  const onchange = (event) => {
    onChange(event);
  }

  return (
    <div>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Note</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="editNoteForm">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input type="text" id="title" name="edittitle" value={note.edittitle} onChange={onchange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea id="description" name="editdescription" value={note.editdescription} onChange={onchange} required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag:</label>
                  <input type="text" id="tag" value={note.edittag} onChange={onchange} name="edittag" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
