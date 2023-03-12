import React from "react";
import Landing from "./Landing/Landing";
import Footer from "./../../components/Footer/Footer";
import WhatOffer from "./../../Student/Home/What Offer/WhatOffer";

import AboutUs from "./About Us/AboutUs";
import Stats from "./stats/Stats";
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
