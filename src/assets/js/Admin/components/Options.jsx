import React from "react";
import { Link } from "react-router-dom";
function Options(props) {
  return (
    <React.Fragment>
      <Link className="view" to={props.View}>
        <i className="fa-solid fa-pen"></i>
      </Link>
      <Link className="delete" to="" onClick={props.HandleDelete}>
        <i className="fa-solid fa-trash"></i>
      </Link>
    </React.Fragment>
  );
}
export default Options;
