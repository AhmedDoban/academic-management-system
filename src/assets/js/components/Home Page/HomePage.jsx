import React from "react";

import "react-awesome-slider/dist/styles.css";

import Slider from "./slider/Slider";
// import OurStuff from "./ourStuff/OurStuff";
import Head from "../../components/Header/Head";
import RanDomQuote from "../../components/Random Quote/RanDomQuote";
import SammaryData from "./Sammary Data/SammaryData";
import WhatOffer from "./What Offer/WhatOffer";
import Footer from "../../components/Footer/Footer";

function HomePage(props) {
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
export default HomePage;
