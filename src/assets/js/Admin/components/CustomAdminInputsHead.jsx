import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function CustomAdminInputsHead(props) {
  const [placeHolder, SetPlaceHolder] = useState();
  useEffect(() => {
    SetPlaceHolder(props.searchName);
  }, [props.searchName]);

  return (
    <React.Fragment>
      <div className="CustomAdminInputsHead">
        <input
          type="search"
          name=""
          id=""
          placeholder={placeHolder}
          value={props.Serach}
          onChange={(e) => props.SetSearch(e.target.value)}
        />
        <Link to={props.linkTo}>Add New {props.Title}</Link>
      </div>
    </React.Fragment>
  );
}
export default CustomAdminInputsHead;
