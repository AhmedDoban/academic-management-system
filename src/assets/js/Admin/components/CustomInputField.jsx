import React from "react";
function CustomInputField(props) {
  return (
    <React.Fragment>
      <div className="input">
        <label htmlFor={props.data}>{props.DataLabel}</label>
        <input type="text" placeholder={props.data} disabled />
      </div>
    </React.Fragment>
  );
}
export default CustomInputField;
