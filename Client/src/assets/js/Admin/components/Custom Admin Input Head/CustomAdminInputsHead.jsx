import React from "react";
import { Link } from "react-router-dom";
import "./CustomAdminInputsHead.css";

function CustomAdminInputsHead(props) {
  return (
    <React.Fragment>
      <div className="CustomAdminInputsHead">
        <div className="card" data-aos="zoom-in">
          <input
            type="search"
            id="Search"
            value={props.Serach}
            onChange={(e) => props.SetSearch(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="Search">Search . . .</label>
        </div>
        <div className="card" data-aos="zoom-in">
          <Link to={props.linkTo}>Add New {props.Title}</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CustomAdminInputsHead;
