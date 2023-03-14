import React from "react";
import Landing from "./Landing/Landing";
import AboutUs from "./About Us/AboutUs";
import Stats from "./stats/Stats";
import Footer from "./../../components/Footer/Footer";
import WhatOffer from './../../components/Home Page/What Offer/WhatOffer';


function Home() {
  return (
    <React.Fragment>
      {/******************** landing********************************/}
      <Landing />
      {/******************** About us ********************************/}
      <AboutUs />
      {/******************** Stats ********************************/}
      <Stats />
      {/******************** What We offer ********************************/}
      <WhatOffer />
      {/******************** Footer ********************************/}
      <Footer />
    </React.Fragment>
  );
}
export default Home;
