import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Summary.css";

function Summary() {
  const params = useParams();
  const [student_id, setStudent_id] = useState([]);
  const [Summary, SetSummary] = useState([]);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };
  console.log(Summary);
  const url =
    "http://camp-coding.tech/fci_project/graduation/select_summary.php";

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            url,
            { subject_id: params.subject_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetSummary(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [url, student_id]);

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
              <Link className="card" to={pdf.summary_link}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets1.lottiefiles.com/packages/lf20_mWCcDd.json"
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
            src="https://assets1.lottiefiles.com/packages/lf20_onjuzgsi.json"
            className="No_SummaryPlayer"
          ></Player>
          <p>There is No Summary </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Summary;
