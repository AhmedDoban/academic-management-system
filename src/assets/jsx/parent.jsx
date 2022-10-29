import React from "react";
import { useNavigate } from "react-router-dom";

const Parent = (props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="NotFounded width-full center-flex txt-center gap-20 col-flex">
        <div className="container">
          <h4 className="text">parent page</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn-shape color-white  font-25 main-btn"
          >
            Go back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Parent;
