import React, { useContext } from "react";
import noteContext from "../Context/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const speak = () => {
    let text = new SpeechSynthesisUtterance(note.description);
    window.speechSynthesis.speak(text);
  };

  return (
    <div className="col-md-3 col-sm-1 " style={{minWidth:"25rem"}} >
      <div className="card my-3"   style={{backgroundColor: "		 #4A4A4A  ",  boxShadow: "0px 0px 1px 0px grey"}}>
        <div className="card-body" >
        <h5 className="card-title" style={{color: "white"}}>{note.title}</h5>
        <p className="card-text" style={{color:"white"}}>{note.description}</p>
          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fas fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i className="fas fa-volume-up" onClick={speak}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
