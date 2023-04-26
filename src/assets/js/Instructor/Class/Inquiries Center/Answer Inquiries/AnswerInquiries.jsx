import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AnswerInquiries.css";

import AnswerInQuiriesInput from "./AnswerInQuiriesInput";

function AnswerInquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);
  const [doctor_id, setdoctor_id] = useState([]);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setdoctor_id(response.doctor_id);
    } catch (error) {
      throw error;
    }
  };

  const url =
    "http://camp-coding.tech/fci_project/graduation/select_inquiry.php";

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
            SetInquiries(response.data.message);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, params.subject_id]);

  return (
    <React.Fragment>
      {Inquiries.length > 0 ? (
        <div className="AnswerInquiries">
          <div className="container">
            {Inquiries.map((Inquirie) => (
              <div className="card" key={Inquirie.ask_id}>
                <div className="data">
                  <p>{Inquirie.title} </p>
                  <span>{Inquirie.answer} </span>
                </div>

                <AnswerInQuiriesInput
                  Inquirie={Inquirie}
                  doctor_id={doctor_id}
                  fetchData={fetchData}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="No_Inquiries">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets10.lottiefiles.com/packages/lf20_zi2xpiyh.json"
            className="NoInquirieslayer"
          ></Player>
          <p>There is No Inquiries </p>
        </div>
      )}
    </React.Fragment>
  );
}
export default AnswerInquiries;
