import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AllInquiries.css";
import { toast } from "react-toastify";

function AllInquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);

  return (
    <React.Fragment>
      {Inquiries.length > 0 ? (
        <div className="AllInquiries">
          <div className="container">
            {Inquiries.map((Inquirie) => (
              <div className="card" key={Inquirie.ask_id} data-aos="zoom-in">
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
            src={require("../../../../../img/Players/Question.json")}
            className="NoInquirieslayer"
          />
          <p>There is No Inquiries </p>
        </div>
      )}
    </React.Fragment>
  );
}
export default AllInquiries;
