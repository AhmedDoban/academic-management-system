import React from "react";
import { Link } from "react-router-dom";
function CourseDataHeader(props) {
  return (
    <React.Fragment>
      <div className="course-data-header">
        <div className="container">
          <div className="blob">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="img-container">
              <img src={require("../../../img/Courses/model.png")} alt="" />
            </div>
          </div>
          <div className="right">
            <h3>{props.h3}</h3>
            <h5>{props.h5}</h5>
            {props.a ? (
              <a href={props.a} className="btn-get-started">
                <i className="fa-solid fa-play"></i>
              </a>
            ) : props.Link ? (
              <Link to={props.Link} className="btn-get-started">
                <i className="fa-solid fa-play"></i>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CourseDataHeader;
