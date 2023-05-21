import React from "react";
import { Link } from "react-router-dom";
function ClassesDataHeader(props) {
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
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave1">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="3"
              fill="rgba(255,255,255, .1)"
            />
          </g>
          <g className="wave2">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="0"
              fill="rgba(255,255,255, .2)"
            />
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" />
          </g>
        </svg>
      </div>
    </React.Fragment>
  );
}
export default ClassesDataHeader;
