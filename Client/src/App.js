import React, { useEffect } from "react";
import Guest from "./assets/js/Guest/Guest";
import Auth from "./assets/js/Guest/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  Login_Local,
  Login_USER_Local,
} from "./assets/Toolkit/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const Login = useSelector((User) => User.User.IsLogin);
  const Type = useSelector((User) => User.User.Type);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    Dispatch(Login_Local());
    if (Login) {
      Dispatch(Login_USER_Local());
      Navigate("/");
    }
  }, [Login, Type]);

  if (!Login) {
    return <Guest />;
  } else {
    return <Auth />;
  }
}

export default App;
