import React, { useState, useEffect } from "react";
import "./Library.css";
import BookCard from "./bookCard";
import axios from "axios";
import { toast } from "react-toastify";
import Dots from "../../components/Dots/Dots";
import BookDetails from "./BookDetails";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFounded from "../../components/Not Founded/NotFounded";

import Mountain from "../Mountain Template/Mountain";
import Toast_Handelar from "./../Toast_Handelar";

function Library() {
  let [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [Empty, setEmpty] = useState(true);

  useEffect(() => getData(), []);

  const getData = async (e) => {
    try {
      await axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            (e ? e : "space") +
            "&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag" +
            "&maxResults=40"
        )
        .then((response) => {
          setItems(response.data.items);
        });
    } catch (err) {
      Toast_Handelar("error", "we can't get books !");
    }
  };

  let oneCall = (e) => {
    if (Empty) {
      getData();
      setEmpty(false);
    }
  };
  oneCall();

  const searchBox = (e) => {
    if (e.key === "Enter") {
      if (search) {
        getData(search);
        setSearch("");
      } else {
        toast.error("You Must Enter Book Name", {
          autoClose: 15000,
          theme: "colored",
        });
      }
    }
  };
  const searchButton = (e) => {
    if (search) {
      getData(search);
      setSearch("");
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
            <Route
              exact
              path=""
              element={<BookCard bookData={items} setItem={setItem} />}
            />
            <Route path=":id" element={<BookDetails item={item} />} />
            <Route path="*" element={<NotFounded to="/NotFounded" />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Library;
