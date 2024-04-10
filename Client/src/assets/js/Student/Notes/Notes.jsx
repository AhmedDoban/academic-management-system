import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Notes.css";
import Mountain from "../../components/Mountain Template/Mountain";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NoteCard from "./NoteCard";

function Notes() {
  const [TextArea, setTextArea] = useState("");
  const [noteName, setnoteName] = useState("");
  const [Search, setSearch] = useState("");

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
      <Mountain>
        <div className="data">
          <h1>Notes</h1>
        </div>
      </Mountain>
      <div className="search-handelar">
        <div className="container" data-aos="fade-up">
          <div className="card">
            <input
              type="search"
              id="Search"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="Search">Search . . .</label>
          </div>
        </div>
      </div>
      <div className="notes">
        <div className="container">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1000: 4 }}
          >
            <Masonry columnsCount={3} gutter="15px">
              {/************ Add note  **************/}
              <div class="card-box-shadow">
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
                    <button onClick={() => HandleFeilds()}>Save</button>
                  </div>
                </div>
              </div>
              {/************ NOtes  **************/}
              {Notes.filter((el) =>
                Search !== ""
                  ? el.NoteName.toLowerCase().includes(Search.toLowerCase())
                  : el
              ).map((data, index) => (
                <div class="card-box-shadow" key={index}>
                  <NoteCard
                    index={index}
                    Note={data}
                    HandleDelete={HandleDelete}
                  />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Notes;
