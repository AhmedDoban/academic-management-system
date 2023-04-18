import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./Inquiries.css";
import { ToastContainer, toast } from "react-toastify";

function Inquiries() {
  const params = useParams();
  const [Inquiries, SetInquiries] = useState([]);
  const [student_id, setStudent_id] = useState([]);
  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };

  const [TextFeild, SetTextField] = useState("");
  const HandleTextFeild = async () => {
    if (TextFeild !== "") {
      try {
        await axios
          .post(
            "http://camp-coding.tech/fci_project/graduation/add_inquiry.php",
            {
              subject_id: params.subject_id,
              student_id: student_id,
              title: TextFeild,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          });
      } catch (error) {
        throw error;
      }
    } else {
      toast.warn("input field is empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const url =
    "http://camp-coding.tech/fci_project/graduation/select_inquiry.php";

  useEffect(() => {
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
    fetchData();
  }, [url, student_id, HandleTextFeild]);

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
              <div className="card">
                <p>{Inquirie.title} </p>
                <span>
                  {Inquirie.answer ? Inquirie.answer : "Ther in no Answer "}
                </span>
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
export default Inquiries;
