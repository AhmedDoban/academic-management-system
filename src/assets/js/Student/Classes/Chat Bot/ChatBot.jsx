import React, { useEffect, useRef, useState } from "react";
import "./ChatBot.css";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Chatbot } from "../../../../../dummyData.js";
function ChatBot(props) {
  const MessageRef = useRef();
  const [TextFeild, SetTextField] = useState("");
  const [Chat, SetChat] = useState([
    {
      message: "Hi , I'm The assest of You How Can I Help ? ",
      type: "bot",
    },
  ]);

  useEffect(() => {
    MessageRef.current.scrollTop = MessageRef.current.scrollHeight;
  }, [Chat]);

  /******************* Enter Key **************************/
  const HandleMessageKey = async (e) => {
    if (e.key === "Enter") {
      if (TextFeild !== "") {
        let data = [];
        data = Chatbot.filter((itemParent) => {
          for (let i = 0; i < itemParent.patterns.length; i++) {
            if (
              itemParent.patterns[i]
                .toLowerCase()
                .includes(TextFeild.toLowerCase())
            ) {
              return itemParent;
            }
          }
        });

        const result =
          data.length > 0
            ? data.slice(0, 1)[0].responses
            : "Sorry I Can't answer";

        SetChat([
          ...Chat,
          {
            type: "user",
            message: TextFeild,
            answer: result,
          },
        ]);
        SetTextField("");
      }
    }
  };
  /******************* Button Key **************************/
  const HandleMessageFeild = () => {
    if (TextFeild !== "") {
      let data = [];
      data = Chatbot.filter((itemParent) => {
        for (let i = 0; i < itemParent.patterns.length; i++) {
          if (
            itemParent.patterns[i]
              .toLowerCase()
              .includes(TextFeild.toLowerCase())
          ) {
            return itemParent;
          }
        }
      });

      const result =
        data.length > 0
          ? data.slice(0, 1)[0].responses
          : "Sorry I Can't answer";

      SetChat([
        ...Chat,
        {
          type: "user",
          message: TextFeild,
          answer: result,
        },
      ]);
      SetTextField("");
    }
  };

  return (
    <React.Fragment>
      <div className="Chatbot">
        <Mountain />
        <div className="messages" ref={MessageRef}>
          {Chat.map((message) => (
            <React.Fragment>
              <div
                className={
                  message.type === "user"
                    ? "messages-data right"
                    : "messages-data left"
                }
                key={Chat.message}
              >
                {message.type === "user" ? (
                  <p>
                    <i className="fa-regular fa-user"></i>
                  </p>
                ) : (
                  <p>
                    <i className="fa-solid fa-robot"></i>
                  </p>
                )}

                <h1>{message.message}</h1>
              </div>

              {message?.answer ? (
                <div className="messages-data left" key={Chat.message}>
                  <p>
                    <i className="fa-solid fa-robot"></i>
                  </p>
                  <h1>{message.answer}</h1>
                </div>
              ) : null}
            </React.Fragment>
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
    </React.Fragment>
  );
}
export default ChatBot;
