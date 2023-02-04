import React from "react";
import { Link } from "react-router-dom";
function Options(props) {
  return (
    <React.Fragment>
      <Link className="edit" to={props.Edit}>
        <i className="fa-solid fa-user-pen"></i>
      </Link>
      <Link className="view" to={props.View}>
        <i className="fa-sharp fa-solid fa-eye"></i>
      </Link>
      <Link className="delete" to="" onClick={props.HandleDelete}>
        <i className="fa-solid fa-trash"></i>
      </Link>
    </React.Fragment>
  );
}
export default Options;
