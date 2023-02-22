import React, { useState, useEffect } from "react";
import Blobs from "../../components/Blobs";

function NoteDetails(props) {
  const [note, SetNote] = useState([]);
  useEffect(() => {
    SetNote(props.Item);
  }, []);
  console.log(note)
  return (
    <React.Fragment>
      <Blobs />
      <div className="note-details-controllar">
        <input
          type="text"
          name="text"
          className="input"
          placeholder="Must Note Name"
          value={note.NoteName}
        />
        <button>Save</button>
      </div>
    </React.Fragment>
  );
}
export default NoteDetails;
