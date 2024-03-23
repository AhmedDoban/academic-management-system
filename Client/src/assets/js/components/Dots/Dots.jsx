import React from "react";
import "./Dots.css";
function Dots({ OtherStyle }) {
  return (
    <React.Fragment>
      <div className={`dots ${OtherStyle}`}></div>
    </React.Fragment>
  );
}
export default Dots;
