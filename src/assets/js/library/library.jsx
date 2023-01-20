import React, { useState, useEffect } from "react";
import "./Library.css";
import BookCard from "./bookCard";
import Footer from "./../components/Footer";
import RanDomQuote from "./../Student/RanDomQuote";

function Library(props) {
  let [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [Empty, setEmpty] = useState(true);
  let oneCall = (e) => {
    if (Empty) {
      if (items) {
        fetch(
          "https://www.googleapis.com/books/v1/volumes?q=Vue js" +
            "&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag" +
            "&maxResults=40"
        )
          .then((res) => res.json())
          .then((data) => setItems(data.items));
      }
      setEmpty(false);
    }
  };
  oneCall();

  const searchButton = (e) => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        search +
        "&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag" +
        "&maxResults=40"
    )
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  };
  const searchBox = (e) => {
    if (e.key === "Enter") {
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          "&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag" +
          "&maxResults=40"
      )
        .then((res) => res.json())
        .then((data) => setItems(data.items));
    }
  };
  return (
    <React.Fragment>
      <div className="Library">
        <div className="head-Section">
          <div className="container">
            <div className="right">
              <p>Welcome to the world in it you will build your brain </p>
              <div className="search">
                <input
                  type="search"
                  placeholder="what are you looking for ? "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={searchBox}
                />
                <button onClick={searchButton}>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <div className="left">
              <img src={require("../../img/landing.png")} alt="" />
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container">
            <BookCard bookData={items} />
          </div>
        </div>
      </div>
      <RanDomQuote />
      <Footer />
    </React.Fragment>
  );
}
export default Library;
