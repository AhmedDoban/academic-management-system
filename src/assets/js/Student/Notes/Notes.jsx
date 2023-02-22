import React, { useState, useEffect } from "react";
import "./Notes.css";
import Blobs from "./../../components/Blobs";
import CardBlur from "./../../components/CardBlur";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";

function Notes() {
  const [TextArea, setTextArea] = useState("");
  const [noteName, setnoteName] = useState("");
  // Get data from the local storage if it exist
  const [Notes, setNotes] = useState(() => {
    const SavedNotes = localStorage.getItem("Notes");
    if (SavedNotes) {
      return JSON.parse(SavedNotes);
    } else {
      return [];
    }
  });
  // Set data To the local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(Notes));
  }, [Notes]);

  // button add data depend on input
  const HandleFeilds = () => {
    if (noteName) {
      // Clone
      let Data = [...Notes];
      // Edit
      Data.push({ NoteText: TextArea, NoteName: noteName });
      // update
      setNotes([...Data]);
    } else {
      toast.error("You must Enter Some Data", {
        autoClose: 15000,
        theme: "colored",
      });
    }
    setTextArea("");
    setnoteName("");
  };
  //Filter data and delete not match
  const HandleDelete = (e, Out_index) => {
    setNotes(Notes.filter((p, index) => index !== Out_index));
  };
  return (
    <React.Fragment>
      <Blobs />
      <div className="notes">
        <div className="container">
          <h1 className="notes_title">Notes</h1>
          <div className="notes-container">
            {/************ Add note  **************/}
            <CardBlur>
              <textarea
                placeholder="What is in your mind....."
                value={TextArea}
                maxLength="250"
                onChange={(e) => setTextArea(e.target.value)}
              />
              <div className="note-footer">
                <input
                  type="text"
                  placeholder="Note Name"
                  value={noteName}
                  onChange={(e) => setnoteName(e.target.value)}
                />
                <button onClick={() => HandleFeilds()}>Save</button>
              </div>
            </CardBlur>
            {/************ NOtes  **************/}
            {Notes.map((data, index) => (
              <Link
                className="card"
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="500"
                to={data.NoteName}
              >
                <CardBlur key={index}>
                  <div className="Note-Data">
                    <p>{data.NoteText}</p>
                  </div>
                  <div className="note-footer">
                    <p> {data.NoteName}</p>
                    <i
                      className="fa-solid fa-trash"
                      onClick={(e) => HandleDelete(e, index)}
                    ></i>
                  </div>
                </CardBlur>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Notes;
