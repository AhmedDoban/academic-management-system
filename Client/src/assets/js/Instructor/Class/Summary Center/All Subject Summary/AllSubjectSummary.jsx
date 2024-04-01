import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import "./AllSubjectSummary.css";

function AllSubjectSummary() {
  const params = useParams();
  const [Summary, SetSummary] = useState([]);

  return (
    <React.Fragment>
      {Summary.length > 0 ? (
        <div className="allSubjectSummary">
          <div className="container">
            {Summary.map((pdf) => (
              <Link
                className="card"
                key={pdf._id}
                to={pdf.PDF}
                data-aos="zoom-in"
              >
                <div className="data">
                  <h1>{pdf.Title}</h1>
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../../../img/Players/Summary.json")}
                    className="PDFPLAyer"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="No_Summary">
          <div className="container">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../../img/Players/NoSummary.json")}
              className="No_SummaryPlayer"
            />
            <p>There is No Summary </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default AllSubjectSummary;
