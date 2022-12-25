import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import Footer from "./../components/Footer";
import Cources from "./Cources";

function StudentCourses(props) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <React.Fragment>
      {/* some coursec swiper  */}
      <AutoplaySlider
        className="slider_Setting courses"
        play={true}
        cancelOnInteraction={false}
        interval={6000}
      >
        {/******************** Card1 ********************************/}
        <div>
          <div className="img-back">
            <img src={require("../../img/Courses/html.png")} alt="" />
          </div>
          <div
            className="center-flex p-relative  col-flex p-30 z-999"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <p className="eee font-25 fw-bold ">The Best</p>
            <h1 className="color-white font-50 txt-capitalize fw-bold ">
              web front{" "}
              <p className="color-white font-50 red-color inline fw-bold ">
                {" "}
                - end Experience
              </p>
            </h1>

            <p className="bdbdbd width-half m-center width-half-mobile txt-center">
              HTML is a markup language used in creating and designing web pages
              and websites. This language is considered one of the oldest and
              most widely used languages in web page design.
              <button className="btn-shape_2 m-0 ">See Course</button>
            </p>
          </div>
        </div>
        {/******************** Card2 ********************************/}
        <div>
          <div className="img-back">
            <img src={require("../../img/Courses/css.png")} alt="" />
          </div>
          <div
            className="center-flex p-relative  col-flex p-30 z-999"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <p className="eee font-25 fw-bold ">
              The Leader in online Learning
            </p>
            <h1 className="color-white font-50 txt-capitalize fw-bold ">
              Build by{" "}
              <p className="color-white font-50 red-color inline fw-bold ">
                {" "}
                Css
              </p>
            </h1>

            <p className="bdbdbd width-half m-center width-half-mobile txt-center">
              Style Sheets for short: CSS; It is a formatting language for web
              pages that cares about the look and design of websites. It was
              specially designed to separate formatting from the content of the
              written document. This applies to colors, fonts, images, and
              backgrounds that are used in the pages, with complete flexibility
              and ease. This technology is concerned with the overall appearance
              of web pages, including colors, images, and so on.
              <button className="btn-shape_2 m-0 ">See Course</button>
            </p>
          </div>
        </div>
        {/******************** Card3 ********************************/}
        <div>
          <div className="img-back">
            <img src={require("../../img/Courses/php.png")} alt="" />
          </div>
          <div
            className="center-flex p-relative  col-flex p-30 z-999"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <p className="eee font-25 fw-bold ">Welcome to New Course</p>
            <h1 className="color-white font-50 txt-capitalize fw-bold ">
              play with{" "}
              <p className="color-white font-50 red-color inline fw-bold ">
                {" "}
                Back-end
              </p>
            </h1>

            <p className="bdbdbd width-half m-center width-half-mobile txt-center">
              PHP was a set of applications written using the Perl language.
              Personal Home Page Tools was named by Rasmus. The Personal Home
              Page Tools is a scripting language primarily designed to be used
              to develop and program web applications. It can also be used to
              produce stand-alone programs, not just for the web
              <button className="btn-shape_2 m-0 ">See Course</button>
            </p>
          </div>
        </div>
      </AutoplaySlider>
      {/* End some coursec swiper  */}
      {/******************************************************/}
      {/* start Cources  */}
      <Cources />
      {/* End Cources  */}
      {/******************************************************/}
      {/* start Footer  */}
      <Footer />
      {/* End Footer  */}
    </React.Fragment>
  );
}
export default StudentCourses;
