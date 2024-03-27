import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Inquiries.css";
import Toast_Handelar from "./../../../components/Toast_Handelar";

function Inquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);
  const [TextFeild, SetTextField] = useState("");

  const HandleTextFeild = async () => {
    if (TextFeild === "") {
      Toast_Handelar("error", "input field is empty");
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Inquiries</h1>
          <div className="card">
            <i className="fa-solid fa-plus" onClick={HandleTextFeild}></i>
            <input
              type="text"
              placeholder="Insert new Inquirie"
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
            />
          </div>
        </div>
      </Mountain>
      {Inquiries.length > 0 ? (
        <div className="Inquiries">
          <div className="container">
            {Inquiries.map((Inquirie) => (
              <div className="card" data-aos="fade-down">
                <div className="data">
                  <p className="titleInqu">
                    {Inquirie.answer ? (
                      <span>
                        <span>{Inquirie.title}</span>
                        <i className="fa-solid fa-check"></i>
                      </span>
                    ) : (
                      Inquirie.title
                    )}
                  </p>
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
            src={require("../../../../img/Players/Question.json")}
            className="NoInquirieslayer"
          ></Player>
          <p>There is No Inquiries </p>
        </div>
      )}
    </React.Fragment>
  );
}
export default Inquiries;
