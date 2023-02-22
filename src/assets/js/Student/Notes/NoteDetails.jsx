import React, { useState, useEffect } from "react";
import Blobs from "../../components/Blobs";
import CardBlur from "../../components/CardBlur";
import { useParams } from "react-router-dom";

function NoteDetails(props) {
  const params = useParams();

  const [note, SetNote] = useState([]);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Blobs />
      <div className="container">
        <div className="note-details-controllar">
          <input
            type="text"
            name="text"
            className="input"
            placeholder="Must Note Name"
            value={note.NoteName}
            onChange={(e) => props.setnoteName(e.target.value)}
          />
          <button>Save</button>
        </div>
        <div className="text-area-contaienr">
          <CardBlur>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={note.NoteText}
              onChange={(e) => props.setTextArea(e.target.value)}
            />
          </CardBlur>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NoteDetails;
