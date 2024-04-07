import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Summary.css";
import { GetAllSummary } from "./../../../../Toolkit/Slices/SummarySlice";
import { useDispatch, useSelector } from "react-redux";

function Summary() {
  const params = useParams();

  const Dispatch = useDispatch();
  const { Summary } = useSelector((state) => state.Summary);

  useEffect(() => {
    Dispatch(GetAllSummary(params.Subject_id));
    //eslint-disable-next-line
  }, []);

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
              <Link className="card" to={pdf.PDF} key={pdf._id}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../img/Players/Summary.json")}
                  className="PDFPLAyer"
                />
                <h1>{pdf.Title}</h1>
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
          />
          <p>There is No Summary </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Summary;
