import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Summary.css";

function Summary() {
  const params = useParams();
  const [Summary, SetSummary] = useState([]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Summary</h1>
        </div>
      </Mountain>
      {Summary.length > 0 ? (
        <div className="Summary">
          <div className="container">
            {Summary.map((pdf) => (
              <Link className="card" to={pdf.summary_link} key={pdf.summary_id}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../img/Players/Summary.json")}
                  className="PDFPLAyer"
                ></Player>
                <h1>{pdf.summary_name}</h1>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="No_Summary">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require("../../../../img/Players/NoSummary.json")}
            className="No_SummaryPlayer"
          ></Player>
          <p>There is No Summary </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Summary;
