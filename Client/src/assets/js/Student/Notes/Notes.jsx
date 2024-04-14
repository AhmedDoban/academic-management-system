import React, { useState, useEffect } from "react";
import "./Notes.css";
import Mountain from "../../components/Mountain Template/Mountain";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NoteCard from "./NoteCard";
import Toast_Handelar from "./../../components/Toast_Handelar";
import { useSelector, useDispatch } from "react-redux";
import {
  AddNewNote,
  CUD_StudentNote,
  GetNotes,
} from "../../../Toolkit/Slices/NotesSlice";
import Loading from "./../../components/Loading/Loading";

function Notes() {
  const Dispatch = useDispatch();
  const [TextArea, setTextArea] = useState("");
  const [noteName, setnoteName] = useState("");
  const [Search, setSearch] = useState("");

  const { Notes, loading } = useSelector((state) => state.Notes);

  useEffect(() => {
    Dispatch(GetNotes());
    //eslint-disable-next-line
  }, []);

  // button add data depend on input
  const HandleFeilds = () => {
    if (noteName) {
      Dispatch(AddNewNote({ NoteName: noteName, NoteDescription: TextArea }));
      Dispatch(CUD_StudentNote());
      setTextArea("");
      setnoteName("");
    } else {
      Toast_Handelar("error", "You must Enter Some Data");
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Notes</h1>
        </div>
      </Mountain>
      <div className="search-handelar">
        <div className="container">
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
      {loading ? (
        <Loading />
      ) : (
        <div className="notes" data-aos="fade-up">
          <div className="container">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1000: 4 }}
            >
              <Masonry columnsCount={3} gutter="15px">
                {/************ Add note  **************/}
                <div className="card-box-shadow">
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
                      <button onClick={() => HandleFeilds()}>
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
                {/************ NOtes  **************/}
                {Notes.filter((el) =>
                  Search !== ""
                    ? el.NoteName.toLowerCase().includes(Search.toLowerCase())
                    : el
                ).map((data, index) => (
                  <div className="card-box-shadow" key={index}>
                    <NoteCard index={index} Note={data} />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Notes;
