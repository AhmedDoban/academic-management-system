import React from "react";
import { useState, useEffect } from "react";
function RounDomQuote(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.quotable.io/random?minLength=100&maxLength=140")
      .then((res) => res.json())
      .then((data) => setItems(data));
    console.log(items.length);
  }, []);

  return (
    <React.Fragment>
      <div className="RounDomQuote">
        <div className="container">
          <h1
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            Quote Of The Day
          </h1>
          <div
            className="quote_container"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1>{items.content}</h1>
            <p>{items.author}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default RounDomQuote;
