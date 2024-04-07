import React, { useEffect } from "react";
import Guest from "./assets/js/Guest/Guest";
import Auth from "./assets/js/Guest/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  Login_Local,
  Login_USER_Local,
} from "./assets/Toolkit/Slices/UserSlice";

function App() {
  const Login = useSelector((User) => User.User.IsLogin);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(Login_Local());
    if (Login) {
      Dispatch(Login_USER_Local());
    } //eslint-disable-next-line
  }, [Login]);

  if (!Login) {
    return <Guest />;
  } else {
    return <Auth />;
  }
}

export default App;
