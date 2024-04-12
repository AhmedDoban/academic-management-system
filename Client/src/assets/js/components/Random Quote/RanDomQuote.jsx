import React, { useState, useEffect } from "react";
import "./RanDomQuote.css";
import LodingFeachData from "../Loding Feach Data/LodingFeachData";
import Toast_Handelar from "../Toast_Handelar";

function RanDomQuote() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      fetch("https://api.quotable.io/random?minLength=100&maxLength=140")
        .then((res) => res.json())
        .then((data) => setItems(data));
    } catch (err) {
      Toast_Handelar('error', "sorry we can't getquote")
    }
  }, []);

  return (
    <React.Fragment>
      <div className="RounDomQuote">
        <div className="container" data-aos="fade-down">
          {items.length > 0 ? (
            <div className="quote">
              <h1>{items.content}</h1>
              <p>{items.author}</p>
            </div>
          ) : (
            <LodingFeachData />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default RanDomQuote;
