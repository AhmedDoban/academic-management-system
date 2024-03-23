import React from "react";
import "./Mountain.css";
function Mountain({ children }) {
  return (
    <React.Fragment>
      <div className="mountain">
        <div className="container">{children}</div>
      </div>
    </React.Fragment>
  );
}
export default Mountain;
