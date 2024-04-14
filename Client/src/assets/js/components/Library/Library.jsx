import React, { useState, useEffect } from "react";
import "./Library.css";
import BookCard from "./bookCard";
import Dots from "../../components/Dots/Dots";
import BookDetails from "./BookDetails";
import { Route, Routes } from "react-router-dom";
import NotFounded from "../../components/Not Founded/NotFounded";
import Mountain from "../Mountain Template/Mountain";
import { useDispatch } from "react-redux";
import Toast_Handelar from "../Toast_Handelar";
import { GetBooks } from "../../../Toolkit/Slices/LibrarySlice";

function Library() {
  const Dispatch = useDispatch();
  let [search, setSearch] = useState("");

  useEffect(() => {
    Dispatch(GetBooks(search));
    //eslint-disable-next-line
  }, []);

  const searchBox = (e) => {
    if (e.key === "Enter") {
      searchButton();
    }
  };

  const searchButton = () => {
    if (search) {
      Dispatch(GetBooks(search));
      setSearch("");
    } else {
      Toast_Handelar("error", "You Must Enter Book Name");
    }
  };

  return (
    <React.Fragment>
      <div className="Library">
        <Mountain>
          <div className="data">
            <h1>Library</h1>
            <div className="card">
              <i
                className="fa-solid fa-magnifying-glass"
                onClick={searchButton}
              />
              <input
                type="search"
                placeholder="what are you looking for ? "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={searchBox}
                className="input-search"
              />
            </div>
          </div>
        </Mountain>

        <div className="content">
          <Dots OtherStyle="top" />
          <Dots OtherStyle="bottom" />

          <Routes>
            <Route exact path="" element={<BookCard />} />
            <Route path=":id" element={<BookDetails />} />
            <Route path="*" element={<NotFounded to="/NotFounded" />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Library;
