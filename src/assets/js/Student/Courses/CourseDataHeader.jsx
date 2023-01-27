import React from "react";
function CourseDataHeader(props) {
  return (
    <React.Fragment>
      <div className="course-data-header">
        <div class="container">
          <h3>{props.h3}</h3>
          <h5>{props.h5}</h5>
          <a href={props.a} class="btn-get-started">
            <i class="fa-solid fa-play"></i>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CourseDataHeader;
