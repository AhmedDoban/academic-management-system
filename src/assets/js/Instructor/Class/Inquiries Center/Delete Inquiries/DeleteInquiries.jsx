import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DeleteInquiries.css";
import Swal from "sweetalert2";

function DeleteInquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);
  const url =
    "https://fci-project1231.000webhostapp.com/fci_project/select_inquiry.php";

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
              `https://fci-project1231.000webhostapp.com/fci_project//doctor/delete_inquiry.php`,
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
                fetchData();
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
              <div className="card" key={Inquirie.ask_id}>
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
            src="https://assets10.lottiefiles.com/packages/lf20_zi2xpiyh.json"
            className="NoInquirieslayer"
          ></Player>
          <p>There is No Inquiries </p>
        </div>
      )}
    </React.Fragment>
  );
}
export default DeleteInquiries;
