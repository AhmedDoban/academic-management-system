import React, { useState, useEffect } from "react";
import "./RanDomQuote.css";
import LodingFeachData from "../Loding Feach Data/LodingFeachData";
import Toast_Handelar from "../Toast_Handelar";
import axios from "axios";

function RanDomQuote() {
  const [Quote, setQuote] = useState([]);

  const getRanDomQuote = async () => {
    try {
      await axios
        .get("https://api.quotable.io/random?minLength=100&maxLength=140")
        .then((response) => {
          setQuote(response.data);
        });
    } catch (err) {
      Toast_Handelar("error", "sorry we can't get Today quote !");
    }
  };

  useEffect(() => {
    getRanDomQuote();
  }, []);

  return (
    <React.Fragment>
      <div className="RounDomQuote">
        <div className="container" data-aos="fade-down">
          {Quote.length > 0 ? (
            <div className="quote">
              <h1>{Quote.content}</h1>
              <p>{Quote.author}</p>
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
