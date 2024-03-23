import React from "react";
import Courses from "./Classes";
import TopInstructor from "./TopInstructor";
import RanDomQuote from "../../components/Random Quote/RanDomQuote";
import ClassesDataHeader from "./ClassesDataHeader";
import Head from "../../components/Header/Head";
import Footer from "../../components/Footer/Footer";
import "./Classes.css";
function StudenClasses(props) {
  return (
    <React.Fragment>
      <Head />
      {/************************************* start Course Data Header ***************************************/}
      <ClassesDataHeader
        h3="WELCOME TO Class Room "
        h5="study more and do your best to get high degree ."
        a="#Subjects"
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
export default StudenClasses;
