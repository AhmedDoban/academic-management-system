import React, { useState } from "react";
import "./Actions.css";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  InsertMessage,
  New_Message,
} from "../../../../Toolkit/Slices/ChatSlice";
import Toast_Handelar from "./../../Toast_Handelar";

function Actions(props) {
  const Params = useParams();
  const Dispatch = useDispatch();

  const [EmojiShow, SetEmojiShow] = useState(false);
  const [MessageInput, SetMEssageInput] = useState("");

  const { user } = useSelector((state) => state.User);

  const HandleSendMessage = () => {
    if (MessageInput !== "") {
      Dispatch(
        New_Message({
          Message: MessageInput,
          Subject_Id: Params.Subject_id,
        })
      ).then((res) => {
        if (res.payload.Status !== "Faild") {
          props.Socket.emit("Send_Message", {
            Subject_Id: Params.Subject_id,
            Message: MessageInput,
            User_Avatar: user.Avatar,
            User_Id: user._id,
            _id: uuidv4(),
            User_Name: user.name,
            createdAt: new Date().toISOString(),
          });
          Dispatch(
            InsertMessage({
              Subject_Id: Params.Subject_id,
              Message: MessageInput,
              User_Avatar: user.Avatar,
              User_Id: user._id,
              _id: uuidv4(),
              User_Name: user.name,
              createdAt: new Date().toISOString(),
            })
          );
          SetMEssageInput("");
        } else {
          Toast_Handelar("error", res.payload.message);
        }
      });
    }
  };

  const HandleEnterKey = (e) => {
    if (e.key === "Enter") {
      HandleSendMessage();
    }
  };

  return (
    <React.Fragment>
      <div className="chat-action">
        <div className="Emoji">
          {EmojiShow && (
            <div className="EmojiPicker">
              <EmojiPicker
                autoFocusSearch="false"
                emojiStyle="google"
                searchDisabled="true"
                width="100%"
                height="100%"
                onEmojiClick={(e) => SetMEssageInput((prev) => prev + e.emoji)}
                theme={localStorage.getItem("theme")}
              />
            </div>
          )}
          <div
            className="Emoji-show"
            onClick={() => SetEmojiShow((prev) => !prev)}
          >
            <Emoji unified="1f604" />
          </div>
        </div>
        <input
          type="text"
          placeholder="message...."
          value={MessageInput}
          onChange={(e) => SetMEssageInput(e.target.value)}
          onKeyDown={() => props.Socket.emit("Typing", Params.Subject_id)}
          onBlur={() => props.Socket.emit("StopTyping", Params.Subject_id)}
          onKeyPress={(e) => HandleEnterKey(e)}
        />
        <button onClick={() => HandleSendMessage()}>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
}
export default Actions;
