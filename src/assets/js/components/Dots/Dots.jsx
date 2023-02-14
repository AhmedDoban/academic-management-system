import React from "react";
import "./Dots.css";
function Dots({ OtherStyle }) {
  return (
    <React.Fragment>
      <div class={`dots ${OtherStyle}`}></div>
    </React.Fragment>
  );
}
export default Dots;
