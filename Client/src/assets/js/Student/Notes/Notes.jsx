import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Routes } from "react-router-dom";
import AllNotes from "./AllNotes";
import NoteDetails from "./NoteDetails";
import NotFounded from "../../components/Not Founded/NotFounded";
import "./Notes.css";

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
      <Routes>
        <Route
          path=""
          // element={<BookCard bookData={items} setItem={setItem} />}
          element={
            <AllNotes
              HandleDelete={HandleDelete}
              HandleFeilds={HandleFeilds}
              TextArea={TextArea}
              setTextArea={setTextArea}
              noteName={noteName}
              setnoteName={setnoteName}
              Notes={Notes}
            />
          }
        />
        <Route
          path=":id"
          element={
            <NoteDetails
              Notes={Notes}
              TextArea={TextArea}
              setTextArea={setTextArea}
              noteName={noteName}
              setnoteName={setnoteName}
            />
          }
        />
        <Route path="*" element={<NotFounded to="/NotFounded" />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Notes;
