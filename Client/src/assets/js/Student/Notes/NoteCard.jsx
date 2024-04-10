import React from "react";
import { useState } from "react";

function NoteCard({ index, Note, HandleDelete }) {
  const [Edit, SetEdit] = useState(false);
  const [TextArea, setTextArea] = useState(Note.NoteText);
  const [noteName, setnoteName] = useState(Note.NoteName);

  const HandleEditNote = () => {
    SetEdit(false);
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
            <button onClick={() => HandleEditNote()}>Save</button>
          </div>
        </div>
      ) : (
        <div class="card" data-color={index % 6}>
          <div className="actions">
            <i
              className="fa-solid fa-trash"
              onClick={(e) => HandleDelete(e, index)}
            />
            <i className="fa-solid fa-pen" onClick={(e) => SetEdit(true)} />
          </div>
          <h4 class="title">{Note.NoteName}</h4>
          <p class="description">{Note.NoteText}</p>
        </div>
      )}
    </React.Fragment>
  );
}
export default NoteCard;
