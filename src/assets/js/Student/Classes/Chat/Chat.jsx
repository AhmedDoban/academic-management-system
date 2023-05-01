import React, { useState, useEffect, useCallback } from "react";
import "./Chat.css";
import Blobs from "./../../../components/Blobs/Blobs";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import GetUser from "./GetUser";

function Chat() {
  const params = useParams();
  const [Chat, SetChat] = useState([]);
  const [TextFeild, SetTextField] = useState("");

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
            `${process.env.REACT_APP_API}/add_message.php`,
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
              SetTextField("");
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

  const url = `${process.env.REACT_APP_API}/select_message.php`;

  useEffect(() => {
    fetchData();
  }, [url, params.subject_id]);

  return (
    <React.Fragment>
      <Blobs />
      <div className="Chat">
        <div className="messages">
          {Chat.map((message) => (
            <div className="messages-data" key={Chat.chat_id}>
              <h1>
                {message.message}
                <p>
                  <GetUser student_id={message.student_id} />
                </p>
              </h1>
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
