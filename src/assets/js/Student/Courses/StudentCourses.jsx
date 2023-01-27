import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import Footer from "../../components/Footer";
import Courses from "./Courses";
import TopInstructor from "./TopInstructor";
import RanDomQuote from "../RanDomQuote";

function StudentCourses(props) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <React.Fragment>
      {/************************************* start Cources ***************************************/}
      <Courses />
      {/************************************* END Cources *****************************************/}

      {/************************************* start TOP instructor ********************************/}
      <TopInstructor />
      {/************************************* END Cources *****************************************/}

      {/************************************* start RounDomQuote ********************************/}
      <RanDomQuote />
      {/************************************* END RounDomQuote *****************************************/}

      {/************************************* start Footer  ***************************************/}
      <Footer />
      {/************************************* End Footer  *****************************************/}
    </React.Fragment>
  );
}
export default StudentCourses;
