import React from "react";

import "react-awesome-slider/dist/styles.css";

// import OurStuff from "./ourStuff/OurStuff";
import RanDomQuote from "../Random Quote/RanDomQuote";
import SammaryData from "./Sammary Data/SammaryData";
import WhatOffer from "./What Offer/WhatOffer";
import Footer from "./../../components/Footer";
import Head from "../../Header/Head";
import Slider from "./slider/Slider";

function StudentHomePage(props) {
  return (
    <React.Fragment>
      <Head />
      <Slider />
      {/******************** Our Stuff ********************************/}
      {/* <OurStuff /> */}
      {/******************** RanDom Quote ********************************/}
      <RanDomQuote />
      {/******************** SammaryData ********************************/}
      <SammaryData />
      {/******************** WhatOffer ********************************/}
      <WhatOffer />
      {/******************** Footer ********************************/}
      <Footer />
    </React.Fragment>
  );
}
export default StudentHomePage;
