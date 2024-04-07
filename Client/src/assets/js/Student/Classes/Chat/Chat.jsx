import React, { useState, useCallback, useRef } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import { useSelector } from "react-redux";
function Chat() {
  const MessageRef = useRef();
  const params = useParams();
  const [Chat, SetChat] = useState([]);
  const [TextFeild, SetTextField] = useState("");
  const { user } = useSelector((state) => state.User);

  const HandleMessageFeild = useCallback(async () => {
    if (TextFeild !== "") {
      SetChat([params]);
    } else {
    }
    //eslint-disable-next-line
  }, [TextFeild]);

  const HandleMessageKey = useCallback(async (e) => {
    if (e.key === "Enter") {
      SetChat([]);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="Chat">
        <Mountain />
        <div className="messages" ref={MessageRef}>
          {Chat.map((message) => (
            <div
              className={
                message.student_id === user._id
                  ? "messages-data right"
                  : "messages-data left"
              }
              key={Chat.chat_id}
            >
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
    </React.Fragment>
  );
}
export default Chat;
