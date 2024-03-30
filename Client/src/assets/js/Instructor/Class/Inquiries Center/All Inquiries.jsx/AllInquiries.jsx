import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import "./AllInquiries.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllInquiries,
  SeeNext,
  SeePrev,
} from "../../../../../Toolkit/Slices/InquiriesSlice";
import LodingFeachData from "../../../../components/Loding Feach Data/LodingFeachData";

function AllInquiries() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { loading, Inquiries, currentPage, number_of_pages } = useSelector(
    (State) => State.Inquiries
  );

  useEffect(() => {
    Dispatch(GetAllInquiries(params.subject_id));
  }, []);

  const HandleNext = () => {
    Dispatch(SeeNext());
    Dispatch(GetAllInquiries(params.subject_id));
  };
  const HandlePrev = () => {
    Dispatch(SeePrev());
    Dispatch(GetAllInquiries(params.subject_id));
  };

  return (
    <React.Fragment>
      {loading ? (
        <LodingFeachData />
      ) : Inquiries.length > 0 ? (
        <React.Fragment>
          <div className="AllInquiries">
            <div className="container" data-aos="fade-down">
              {Inquiries.map((Inquiry) => (
                <div className="card" key={Inquiry._id}>
                  <div className="data">
                    <h4>{Inquiry.StudentName}</h4>
                    <p className="titleInqu">
                      {Inquiry.Answer ? (
                        <span>
                          <span>{Inquiry.Question}</span>
                          <i className="fa-solid fa-check" />
                        </span>
                      ) : (
                        Inquiry.Question
                      )}
                    </p>
                    <span>
                      {Inquiry.Answer ? (
                        Inquiry.Answer
                      ) : (
                        <span>
                          <span>There is no Answer</span>
                          <i className="fa-solid fa-triangle-exclamation" />
                        </span>
                      )}
                    </span>
                  </div>
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
export default AllInquiries;
