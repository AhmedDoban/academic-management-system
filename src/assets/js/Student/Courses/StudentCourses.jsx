import React from "react";
import Footer from "../../components/Footer";
import Courses from "./Courses";
import TopInstructor from "./TopInstructor";
import RanDomQuote from "../RanDomQuote";
import CourseDataHeader from "./CourseDataHeader";
import Head from "../../Header/Head";

function StudentCourses(props) {
  return (
    <React.Fragment>
      <Head />
      {/************************************* start Course Data Header ***************************************/}
      <CourseDataHeader
        h3="WELCOME TO Course"
        h5="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
            quis."
        a="#student-courses-container"
      />
      {/************************************* End Course Data Header ***************************************/}

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
