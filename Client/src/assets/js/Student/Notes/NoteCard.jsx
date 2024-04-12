import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CUD_StudentNote,
  DeleteNote,
  UpdateNote,
} from "../../../Toolkit/Slices/NotesSlice";

function NoteCard({ index, Note }) {
  const Dispatch = useDispatch();
  const [Edit, SetEdit] = useState(false);
  const [TextArea, setTextArea] = useState(Note.NoteDescription);
  const [noteName, setnoteName] = useState(Note.NoteName);

  const HandleEditNote = (index) => {
    Dispatch(
      UpdateNote({
        NoteName: noteName,
        NoteDescription: TextArea,
        index: index,
      })
    );
    Dispatch(CUD_StudentNote());
    SetEdit(false);
  };

  // Filter data and delete not match
  const HandleDelete = (index) => {
    Dispatch(DeleteNote({ index: index }));
    Dispatch(CUD_StudentNote());
  };

  return (
    <React.Fragment>
      {Edit ? (
        <div className="note-card">
          <textarea
            placeholder="What is in your mind....."
            value={TextArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <div className="note-footer">
            <input
              type="text"
              placeholder="Enter Note Name . . . "
              value={noteName}
              onChange={(e) => setnoteName(e.target.value)}
            />
            <button onClick={() => HandleEditNote(index)}>
              <i className="fa-regular fa-floppy-disk" />
            </button>
          </div>
        </div>
      ) : (
        <div className="card" data-color={index % 6}>
          <div className="actions">
            <i
              className="fa-solid fa-trash"
              onClick={() => HandleDelete(index)}
            />
            <i className="fa-solid fa-pen" onClick={() => SetEdit(true)} />
          </div>
          <h4 className="title">{Note.NoteName}</h4>
          <p className="description">{Note.NoteDescription}</p>
        </div>
      )}
    </React.Fragment>
  );
}
export default NoteCard;
