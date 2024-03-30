import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DeleteInquiries.css";
import Swal from "sweetalert2";

function DeleteInquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);

  const DeleteInquiriesHandelar = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Delete ${data.video_title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(
              `${process.env.REACT_APP_API}/doctor/delete_inquiry.php`,
              { question_id: data.ask_id },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "text/plain",
                },
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                Swal.fire("Deleted!", response.data.message, "success");
              }
            });
        } catch (error) {
          throw error;
        }
      }
    });
  };
  return (
    <React.Fragment>
      {Inquiries.length > 0 ? (
        <div className="DeleteInquiries">
          <div className="container">
            {Inquiries.map((Inquirie) => (
              <div className="card" key={Inquirie.ask_id} data-aos="zoom-in">
                <div className="data">
                  <p>{Inquirie.title} </p>
                  <span>
                    {Inquirie.answer ? Inquirie.answer : "لا يوجد رد"}
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => DeleteInquiriesHandelar(Inquirie)}
                    ></i>
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
export default DeleteInquiries;
