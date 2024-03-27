import React from "react";
import Blobs from "./../../components/Blobs/Blobs";
import CardBlur from "./../../components/Card Blur/CardBlur";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";

function AllNotes(props) {
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Notes</h1>
        </div>
      </Mountain>
      <div className="notes">
        <Blobs />
        <div className="container">
          <div className="notes-container">
            {/************ Add note  **************/}
            <CardBlur>
              <textarea
                placeholder="What is in your mind....."
                value={props.TextArea}
                maxLength="250"
                onChange={(e) => props.setTextArea(e.target.value)}
              />
              <div className="note-footer">
                <input
                  type="text"
                  placeholder="Note Name"
                  value={props.noteName}
                  onChange={(e) => props.setnoteName(e.target.value)}
                />
                <button onClick={() => props.HandleFeilds()}>Save</button>
              </div>
            </CardBlur>
            {/************ NOtes  **************/}
            {props?.Notes.map((data, index) => (
              <div
                className="card"
                data-aos="fade-right"
                data-aos-duration="500"
              >
                <CardBlur key={index}>
                  <Link className="Note-Data" to={data.NoteText}>
                    <p>{data.NoteText}</p>
                  </Link>
                  <div className="note-footer">
                    <p> {data.NoteName}</p>
                    <i
                      className="fa-solid fa-trash"
                      onClick={(e) => props.HandleDelete(e, index)}
                    ></i>
                  </div>
                </CardBlur>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AllNotes;
