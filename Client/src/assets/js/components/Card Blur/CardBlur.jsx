import React from "react";
import "./Cardblur.css";
function CardBlur({ children, active }) {
  return (
    <React.Fragment>
      <div className={`CardBlur  ${active}`}>{children}</div>
    </React.Fragment>
  );
}
export default CardBlur;
