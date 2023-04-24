import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import "./notFounded.css";
const NotFounded = (props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="NotFounded">
        <div className="container">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="https://assets4.lottiefiles.com/packages/lf20_RaWlll5IJz.json"
            className="palyer"
          ></Player>
          <h4 className="not founded">Page Not Founded</h4>
          <p>
            We're sorry, the page you requested could not be founded
            <span>please go back to home page</span>
          </p>
          <button onClick={() => navigate("/")} className="GobackBtn">
            Go back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFounded;
