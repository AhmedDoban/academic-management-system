import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./AllSubjectSammary.css";

function AllSubjectSammary() {
  const params = useParams();
  const [Summary, SetSummary] = useState([]);

  const url = `${process.env.REACT_APP_API}/select_summary.php`;

  useEffect(() => {
    const fetchData = async function () {
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
  }, [url]);

  return (
    <React.Fragment>
      {Summary.length > 0 ? (
        <div className="allSubjectSammary">
          <div className="container">
            {Summary.map((pdf) => (
              <Link
                className="card"
                key={pdf.summary_id}
                to={pdf.summary_link}
                data-aos="zoom-in"
              >
                <div className="data">
                  <h1>{pdf.summary_name}</h1>
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src="https://assets1.lottiefiles.com/packages/lf20_mWCcDd.json"
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
              src="https://assets1.lottiefiles.com/packages/lf20_onjuzgsi.json"
              className="No_SummaryPlayer"
            />
            <p>There is No Summary </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default AllSubjectSammary;
