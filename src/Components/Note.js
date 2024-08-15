import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate('/login')
  }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click(); // Open the modal
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  const breakpointColumnsObj = {
    default: 3,
    1100:2,
    700: 1,
    500: 1,
  };
  
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content"       style={{
        backgroundColor: "#171717", // Modal background color
      }}
>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
  type="text"
  className="form-control"
  id="etitle"
  name="etitle"
  value={note.etitle}
  onChange={onChange}
  minLength={5}
  required
      placeholder="Add a title"
/>

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    style={{
                      backgroundColor: "#2F2F2F",  // Dark gray background
                      color: "#FFFFFF",             // White text
                      '::placeholder': { color: "#FFFFFF" } // White placeholder text
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      

      <div className="row my-3">
      <h2 style={{color:"white"}}>Your Notes</h2>
      <div className="container">
        {notes.length === 0 && "No notes to display"}
      </div>

      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <NoteItem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </Masonry>

      </div>
    </>
  );
};

export default Notes;
