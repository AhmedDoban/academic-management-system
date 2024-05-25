import React from "react";
import { Link } from "react-router-dom";
import "./CustomAdminInputsHead.css";

function CustomAdminInputsHead({ Serach, SetSearch, linkTo, Title }) {
  return (
    <React.Fragment>
      <div className="CustomAdminInputsHead">
        <div className="card">
          <input
            type="search"
            id="Search"
            value={Serach}
            onChange={(e) => SetSearch(e.target.value)}
            placeholder=" "
          />
          <label htmlFor="Search">Search . . .</label>
        </div>
        <div className="card">
          <Link to={linkTo}>Add New {Title}</Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CustomAdminInputsHead;
