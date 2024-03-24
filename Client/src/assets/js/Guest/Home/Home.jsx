import React from "react";
import Slider from "./slider/Slider";
import RanDomQuote from "./../../components/Random Quote/RanDomQuote";
import SammaryData from "./Sammary Data/SammaryData";
import WhatOffer from "./What Offer/WhatOffer";
import Footer from "./../../components/Footer/Footer";
import "react-awesome-slider/dist/styles.css";

function Home(props) {
  return (
    <React.Fragment>
      <Slider />
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
export default Home;
