import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Library.css";
import BookCard from "./bookCard";
import Footer from "./../components/Footer";
import RanDomQuote from "./../Student/RanDomQuote";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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

  const searchButton = (e) => {
    if (search) {
      getData(search);
      setSearch("");
    } else {
      toast.error("You must Enter Book Name", {
        autoClose: 15000,
        theme: "colored",
      });
    }
  };
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
