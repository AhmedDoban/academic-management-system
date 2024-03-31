import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import "./AnswerInquiries.css";

import AnswerInQuiriesInput from "./AnswerInQuiriesInput";
import { useDispatch, useSelector } from "react-redux";
import LodingFeachData from "../../../../components/Loding Feach Data/LodingFeachData";
import {
  GetAllInquiries,
  SeeNext,
  SeePrev,
} from "../../../../../Toolkit/Slices/InquiriesSlice";

function AnswerInquiries() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { loading, Inquiries, currentPage, number_of_pages } = useSelector(
    (State) => State.Inquiries
  );

  const HandleNext = () => {
    Dispatch(SeeNext());
    Dispatch(GetAllInquiries(params.Subject_id));
  };
  const HandlePrev = () => {
    Dispatch(SeePrev());
    Dispatch(GetAllInquiries(params.Subject_id));
  };

  useEffect(() => {
    Dispatch(GetAllInquiries(params.Subject_id));
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LodingFeachData />
      ) : Inquiries.length > 0 ? (
        <React.Fragment>
          <div className="AnswerInquiries">
            <div className="container" data-aos="fade-down">
              {Inquiries.map((Inquiry) => (
                <div className="card" key={Inquiry._id}>
                  <div className="data">
                    <p>{Inquiry.Question}</p>
                    <span>{Inquiry.Answer} </span>
                  </div>

                  <AnswerInQuiriesInput
                    Subject_id={Inquiry.Subject_Id}
                    _id={Inquiry._id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="Inquiries_Actions">
            <div className="container">
              <button
                onClick={HandlePrev}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "active" : ""}
              >
                Previous
              </button>
              <button
                onClick={HandleNext}
                disabled={currentPage === number_of_pages}
                className={currentPage === number_of_pages ? "active" : ""}
              >
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
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
export default AnswerInquiries;
