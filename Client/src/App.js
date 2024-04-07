import React, { useEffect, useRef } from "react";
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
  const BackToTopBtn = useRef();

  useEffect(() => {
    Dispatch(Login_Local());
    if (Login) {
      Dispatch(Login_USER_Local());
    } //eslint-disable-next-line
  }, [Login]);

  const BackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY >= 150) {
      BackToTopBtn.current.style.display = "flex";
    } else {
      BackToTopBtn.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <i
        className="fas fa-arrow-up back-to-top"
        style={{ display: "none" }}
        onClick={() => BackToTop()}
        ref={BackToTopBtn}
      />
      {!Login ? <Guest /> : <Auth />}
    </React.Fragment>
  );
}

export default App;
