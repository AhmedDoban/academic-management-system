import React, { useState, useEffect } from "react";
import "./RanDomQuote.css";
import LodingFeachData from "../Loding Feach Data/LodingFeachData";

function RanDomQuote(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.quotable.io/random?minLength=100&maxLength=140")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <React.Fragment>
      <div className="RounDomQuote">
        <div className="container">
          <div
            className="quote_container"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            {items.length > 0 ? (
              <>
                <h1>{items.content}</h1>
                <p>{items.author}</p>
              </>
            ) : (
              <LodingFeachData />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default RanDomQuote;
