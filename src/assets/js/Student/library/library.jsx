import React, { useState, useEffect } from "react";
import "./Library.css";
import BookCard from "./bookCard";
import RanDomQuote from "./../RanDomQuote";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "../../components/Footer";

function Library(props) {
  let [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [Empty, setEmpty] = useState(true);

  useEffect(() => getData(), []);

  const getData = (e) => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          (e ? e : "space") +
          "&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag" +
          "&maxResults=40"
      )
      .then((response) => {
        setItems(response.data.items);
      });
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
        <div className="head-Section">
          <div className="container">
            <h3>
              Room Without <span>Books </span> Like Body Without
              <span> Soul </span>
            </h3>
            <h5>Welcome to the world in it you will build your brain </h5>
            <div className="search-box">
              <button className="btn-search" onClick={searchButton}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
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
        </div>

        <div className="content">
          <h1 className="main-titel">
            <div className="div-circle"></div>
            <div className="div-circle"></div>
            <span> Library Books</span>
          </h1>
          <div className="dots-img dots-top"></div>
          <div className="dots-img dots-bottom"></div>
          <div
            className="container"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <BookCard bookData={items} />
          </div>
        </div>
      </div>
      <RanDomQuote />
      <Footer />
      <ToastContainer />
    </React.Fragment>
  );
}
export default Library;