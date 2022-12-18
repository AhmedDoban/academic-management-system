import React, { Component } from "react";
import { Link } from "react-router-dom";

function Stuff(props) {
  return (
    <React.Fragment>
      <div
        className="our-stuff"
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <h1 className="main-titel">Course categories</h1>
        <div className="container">
          {/******************** Card1 ********************************/}
          <div
            className="card"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="img-container">
              <img src={require("../../img/Courses/all-courses.jpg")} alt="" />
            </div>
            <div className="number-courses">
              <p>10 Course</p>
            </div>
            <h1>All Courses</h1>
          </div>
          {/******************** End ********************************/}
          {/******************** Card2 ********************************/}
          <div
            className="card"
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="img-container">
              <img
                src={require("../../img/Courses/Business-Courses.jpg")}
                alt=""
              />
            </div>
            <div className="number-courses">
              <p>4 Course</p>
            </div>
            <h1>Business Courses</h1>
          </div>
          {/******************** End ********************************/}
          {/******************** Card3 ********************************/}
          <div
            className="card"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="img-container">
              <img
                src={require("../../img/Courses/Graphics-Courses.jpg")}
                alt=""
              />
            </div>
            <div className="number-courses">
              <p>5 Course</p>
            </div>
            <h1>Graphics Courses</h1>
          </div>
          {/******************** End ********************************/}
          {/******************** Card4 ********************************/}
          <div
            className="card"
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="img-container">
              <img src={require("../../img/Courses/web-Courses.png")} alt="" />
            </div>
            <div className="number-courses">
              <p>7 Course</p>
            </div>
            <h1>Web Courses</h1>
          </div>
          {/******************** End ********************************/}
        </div>
        <Link to="">Show More</Link>
      </div>
    </React.Fragment>
  );
}
export default Stuff;
