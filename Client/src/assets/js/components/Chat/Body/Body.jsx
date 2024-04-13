import React from "react";
import "./Body.css";
import { useSelector } from "react-redux";

export const GetName = (Name) => {
  if (typeof Name === "string") {
    const NewName = Name[0] + Name[1];
    return NewName;
  }
};

export default function Body(props) {
  const { user } = useSelector((state) => state.User);
  const { Chats } = useSelector((state) => state.Chats);

  return (
    <div className="Chat-body" ref={props.ScrollRef}>
      {Chats.map((message) => (
        <div
          className={message.User_Id === user._id ? "card Right" : "card Left"}
          key={message._id}
        >
          <div className="img-box">
            {message.User_Avatar ? (
              <img src={message.User_Avatar} alt="logo" />
            ) : (
              GetName(message.User_Name)
            )}
          </div>
          <h1>
            <p className="userName">{message.User_Name}</p>
            <div className="message">{message.Message}</div>
            <span className="time">
              {message.createdAt.split("T")[1].split(".")[0]}
            </span>
          </h1>
        </div>
      ))}
      {props.Typing && (
        <div className={"card Left"}>
          <div className="img-box">
            <i className="fa-regular fa-user"></i>
          </div>

          <div className="Typing">
            <div className="bullet"></div>
            <div className="bullet"></div>
            <div className="bullet"></div>
          </div>
        </div>
      )}
    </div>
  );
}
