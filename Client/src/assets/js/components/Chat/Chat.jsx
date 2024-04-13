import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import Body from "./Body/Body";
import Actions from "./Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { GetChats, InsertMessage } from "../../../Toolkit/Slices/ChatSlice";

const Socket = io.connect(process.env.REACT_APP_SOCKET);

function Chat() {
  const Params = useParams();
  const Dispatch = useDispatch();

  const { Chats } = useSelector((state) => state.Chats);
  
  const ScrollRef = useChatScroll(Chats);

  const [Typing, SetTyping] = useState(false);
  const [ArriveMessage, SeArriveMessage] = useState(null);

  useEffect(() => {
    Dispatch(
      GetChats({
        Subject_Id: Params.Subject_id,
      })
    );
    //eslint-disable-next-line
  }, []);

  function useChatScroll(dep) {
    const ref = useRef();
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);
    return ref;
  }

  useEffect(() => {
    Socket.emit("online_Chat", {
      Subject_id: Params.Subject_id,
    });
  }, [Params.Subject_id]);

  useEffect(() => {
    Socket.on("Recive_Message", (msg) => {
      SeArriveMessage(msg);
    });
  }, []);

  useEffect(() => {
    Socket.on("Show_Typing_Status", () => {
      if (ScrollRef.current !== null) {
        ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
      }
      SetTyping(true);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    Socket.on("Hide_Typing_Status", () => {
      if (ScrollRef.current !== null) {
        ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
      }
      SetTyping(false);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    ArriveMessage && Dispatch(InsertMessage(ArriveMessage));
    //eslint-disable-next-line
  }, [ArriveMessage]);

  return (
    <React.Fragment>
      <div className="Chat">
        <div className="container">
          <Body Typing={Typing} SetTyping={SetTyping} ScrollRef={ScrollRef} />
          <Actions Typing={Typing} SetTyping={SetTyping} Socket={Socket} />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Chat;
