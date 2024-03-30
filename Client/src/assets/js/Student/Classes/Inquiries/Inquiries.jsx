import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Inquiries.css";
import Toast_Handelar from "./../../../components/Toast_Handelar";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewInquiry,
  GetAllInquiries,
  InsertInquiry,
  SeeNext,
  SeePrev,
} from "../../../../Toolkit/Slices/InquiriesSlice";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";

function Inquiries() {
  const params = useParams();
  const Dispatch = useDispatch();
  const [TextFeild, SetTextField] = useState("");
  const { loading, Inquiries, currentPage, number_of_pages } = useSelector(
    (State) => State.Inquiries
  );
  const { name } = useSelector((State) => State.User.user);

  useEffect(() => {
    Dispatch(GetAllInquiries(params.Subject_id));
  }, []);

  const HandleTextFeild = () => {
    if (TextFeild === "") {
      Toast_Handelar("error", "input field is empty");
    } else {
      Dispatch(
        AddNewInquiry({ Subject_Id: params.Subject_id, Question: TextFeild })
      ).then((res) => {
        if (res.payload.Status !== "Faild") {
          SetTextField("");
        }
      });
      Dispatch(
        InsertInquiry({
          _id: Inquiries.length + 1,
          StudentName: name,
          Question: TextFeild,
        })
      );
    }
  };
  const HandleTextFeildEnterKey = (e) => {
    if (e.key === "Enter") {
      Dispatch(
        AddNewInquiry({ Subject_Id: params.Subject_id, Question: TextFeild })
      ).then((res) => {
        if (res.payload.Status !== "Faild") {
          SetTextField("");
        }
      });
      Dispatch(
        InsertInquiry({
          _id: Inquiries.length + 1,
          StudentName: name,
          Question: TextFeild,
        })
      );
    }
  };

  const HandleNext = () => {
    Dispatch(SeeNext());
    Dispatch(GetAllInquiries(params.Subject_id));
  };
  const HandlePrev = () => {
    Dispatch(SeePrev());
    Dispatch(GetAllInquiries(params.Subject_id));
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
              placeholder="Insert new Inquiry ?"
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
              onKeyPress={(e) => HandleTextFeildEnterKey(e)}
            />
          </div>
        </div>
      </Mountain>
      {loading ? (
        <LodingFeachData />
      ) : Inquiries.length > 0 ? (
        <React.Fragment>
          <div className="Inquiries">
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
            src={require("../../../../img/Players/Question.json")}
            className="NoInquirieslayer"
          />
          <p>There is No Inquiries </p>
        </div>
      )}
    </React.Fragment>
  );
}
export default Inquiries;
