import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AllInquiries.css";
import { ToastContainer, toast } from "react-toastify";

function AllInquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);
  const url =
    "http://camp-coding.tech/fci_project/graduation/select_inquiry.php";

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
        <div className="AllInquiries">
          <div className="container">
            {Inquiries.map((Inquirie) => (
              <div className="card">
                <div className="data">
                  <p>{Inquirie.title} </p>
                  <span>
                    {Inquirie.answer ? (
                      Inquirie.answer
                    ) : (
                      <span>
                        <span>لا يوجد رد</span>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </span>
                    )}
                  </span>
                </div>
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
      <ToastContainer />
    </React.Fragment>
  );
}
export default AllInquiries;
