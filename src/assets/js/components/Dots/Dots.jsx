import React from "react";
import "./Dots.css";
function Dots({ OtherStyle }) {
  const arr = new Array(120).fill(null);
  return (
    <React.Fragment>
      <div class={`dots ${OtherStyle}`}>
        {arr.map((p) => (
          <div></div>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Dots;
