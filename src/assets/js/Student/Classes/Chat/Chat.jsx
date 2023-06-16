import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import GetUser from "./GetUser";
import Mountain from "../../../components/Mountain Template/Mountain";

function Chat() {
  const MessageRef = useRef();
  const params = useParams();
  const [Chat, SetChat] = useState([]);
  const [TextFeild, SetTextField] = useState("");
  const [StudentId, SetStudentID] = useState("");

  const GetId = () => {
    let Id = JSON.parse(localStorage.getItem("User"));
    SetStudentID(Id.student_id);
    MessageRef.current.scrollTop = MessageRef.current.scrollHeight;
  };
  const fetchData = async function () {
    GetId();
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

  const HandleMessageFeild = useCallback(async () => {
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
  const HandleMessageKey = useCallback(async (e) => {
    if (e.key === "Enter") {
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
    }
  });
  const url = `${process.env.REACT_APP_API}/select_message.php`;

  useEffect(() => {
    fetchData();
    MessageRef.current.scrollTop = MessageRef.current.scrollHeight;
  }, [url, params.subject_id]);

  return (
    <React.Fragment>
      <div className="Chat">
        <Mountain />
        <div className="messages" ref={MessageRef}>
          {Chat.map((message) => (
            <div
              className={
                message.student_id === StudentId
                  ? "messages-data right"
                  : "messages-data left"
              }
              key={Chat.chat_id}
            >
              <p>
                <GetUser student_id={message.student_id} />
              </p>
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
            onKeyPress={HandleMessageKey}
            className={TextFeild.length > 0 ? "active" : ""}
          />
          <button
            className={
              TextFeild.length > 0
                ? "SendMessage-button active"
                : "SendMessage-button"
            }
            onClick={HandleMessageFeild}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Chat;
