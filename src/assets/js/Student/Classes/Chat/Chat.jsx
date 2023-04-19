import React, { useState, useEffect, useCallback } from "react";
import "./Chat.css";
import Blobs from "./../../../components/Blobs/Blobs";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

function Chat() {
  const params = useParams();
  const [Chat, SetChat] = useState([]);
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
            SetChat(response.data.message);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  const HandleTextFeild = useCallback(async () => {
    if (TextFeild !== "") {
      try {
        await axios
          .post(
            "http://camp-coding.tech/fci_project/graduation/add_message.php",
            {
              subject_id: params.subject_id,
              message: TextFeild,
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
              fetchData();
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
  });

  const url =
    "http://camp-coding.tech/fci_project/graduation/select_message.php";

  useEffect(() => {
    fetchData();
  }, [url, student_id, params.subject_id]);

  console.log(Chat);
  return (
    <React.Fragment>
      <Blobs />
      <div className="Chat">
        <div className="messages">
          {Chat.map((message) => (
            <div className="messages-data">
              <h1>{message.message}</h1>
            </div>
          ))}
        </div>
        <div className="SendMessage">
          <input
            type="text"
            placeholder=""
            value={TextFeild}
            onChange={(e) => SetTextField(e.target.value)}
          />
          <button className="SendMessage-button" onClick={HandleTextFeild}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Chat;
