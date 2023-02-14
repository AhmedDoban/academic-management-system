import React from "react";

function CardBlur({ children, active }) {
  return (
    <React.Fragment>
      <div className={`CardBlur  ${active}`}>
        <div className="blur-layer"></div>
        {children}
      </div>
    </React.Fragment>
  );
}
export default CardBlur;
