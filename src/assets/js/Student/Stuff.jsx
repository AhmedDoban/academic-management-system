import React, { Component } from "react";

function Stuff(props) {
  return (
    <React.Fragment>
      <div className="our-stuff">
        <h1 className="main-titel">Course categories</h1>
        <div className="container">
          <div className="card">
            <div className="img-container">
              <img src={require("../../img/post/10.jpeg")} alt="" />
            </div>
            <div className="number-courses">
              <p>10 Course</p>
            </div>
            <h1>All Courses</h1>
          </div>
          <div className="card">
            <div className="img-container">
              <img src={require("../../img/post/10.jpeg")} alt="" />
            </div>
            <div className="number-courses">
              <p>10 Course</p>
            </div>
            <h1>All Courses</h1>
          </div>
          <div className="card">
            <div className="img-container">
              <img src={require("../../img/post/10.jpeg")} alt="" />
            </div>
            <div className="number-courses">
              <p>10 Course</p>
            </div>
            <h1>All Courses</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Stuff;
