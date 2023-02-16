import React from "react";

function CardBlur({ children, active }) {
  return (
    <React.Fragment>
      <div className={`CardBlur  ${active}`}>
        {children}
      </div>
    </React.Fragment>
  );
}
export default CardBlur;
