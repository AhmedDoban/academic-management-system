import React, { useState, useEffect } from "react";
import "./Library.css";
import BookCard from "./bookCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "../../components/Footer/Footer";
import Dots from "../../components/Dots/Dots";
import BookDetails from "./BookDetails";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFounded from "../../components/Not Founded/NotFounded";
import { Player } from "@lottiefiles/react-lottie-player";

function Library() {
  let [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
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
            <Player
              className="Book-Reader-user"
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets6.lottiefiles.com/packages/lf20_ad3uxjiv.json"
            ></Player>

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
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28 "
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="wave-path"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="wave1">
              <use
                xlinkHref="#wave-path"
                x="50"
                y="3"
                fill="rgba(255,255,255, .1)"
              />
            </g>
            <g className="wave2">
              <use
                xlinkHref="#wave-path"
                x="50"
                y="0"
                fill="rgba(255,255,255, .2)"
              />
            </g>
            <g className="wave3">
              <use xlinkHref="#wave-path" x="50" y="9" />
            </g>
          </svg>
        </div>

        <div className="content">
          <h1 className="main-titel">
            <div className="div-circle"></div>
            <div className="div-circle"></div>
            <span> Library Books</span>
          </h1>
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

      <Footer />
      <ToastContainer />
    </React.Fragment>
  );
}
export default Library;
