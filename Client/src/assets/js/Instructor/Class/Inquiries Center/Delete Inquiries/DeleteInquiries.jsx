import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import "./DeleteInquiries.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteInquiry,
  DeleteInquiryLocal,
  GetAllInquiries,
  SeeNext,
  SeePrev,
} from "../../../../../Toolkit/Slices/InquiriesSlice";
import LodingFeachData from "../../../../components/Loding Feach Data/LodingFeachData";

function DeleteInquiries() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { loading, Inquiries, currentPage, number_of_pages } = useSelector(
    (State) => State.Inquiries
  );

  useEffect(() => {
    Dispatch(GetAllInquiries(params.Subject_id));
  }, []);

  const DeleteInquiriesHandelar = (data) => {
    Swal.fire({
      title: "Are you sure You want to Delete this inquiry ?",
      text: data.Question,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        Dispatch(
          DeleteInquiry({ Subject_Id: params.Subject_id, _id: data._id })
        ).then((res) => {
          if (res.payload.Status !== "Faild") {
            Dispatch(DeleteInquiryLocal(data));
          }
        });
      }
    });
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
      {loading ? (
        <LodingFeachData />
      ) : Inquiries.length > 0 ? (
        <React.Fragment>
          <div className="DeleteInquiries">
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
                      <span>
                        {Inquiry.Answer ? Inquiry.Answer : "There is no Answer"}
                      </span>
                      <i
                        className="fa-solid fa-trash TrachAction"
                        onClick={() => DeleteInquiriesHandelar(Inquiry)}
                      />
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
export default DeleteInquiries;
