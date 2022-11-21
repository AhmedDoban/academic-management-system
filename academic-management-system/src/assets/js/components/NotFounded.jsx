import React from "react";
import notfound from "../../img/sorry.png";
import { useNavigate } from "react-router-dom";

const NotFounded = (props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="NotFounded width-full center-flex txt-center gap-20 col-flex">
        <div className="container">
          <img src={notfound} alt="" />
          <h4 className="text">
            Oops...
            <br />
            We are sorry but the page you Were locking for Was not Found...!
            <p>Error 404 ....</p>
          </h4>
          <button
            onClick={() => navigate("/")}
            className="btn-shape color-white  font-25 main-btn"
          >
            Go back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFounded;
