import React, { Component } from "react";
import { Posts } from "../../../dummyData";
import Post from "./Post";
import Share from "./Share";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import Stuff from "./Stuff";
import { Link } from "react-router-dom";
import WhatOffer from "./WhatOffer";
import SammaryData from "./SammaryData";
import Footer from "./../components/Footer";

function StudentHomePage(props) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <React.Fragment>
      <AutoplaySlider
        className="slider_Setting"
        play={true}
        cancelOnInteraction={false}
        interval={6000}
      >
        {/******************** Card1 ********************************/}
        <div>
          <div
            className="left-content"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="left-content-titel">
              <p>The Best</p>
              <h1>
                Education <p className="">Experience</p>
              </h1>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
                illum temporibus adipisci iste aspernatur facilis corrupti
                maxime dicta consectetur error voluptas consequatur
                necessitatibus?
              </p>
            </div>
          </div>
          <div
            className="right-content"
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <img src={require("../../img/slider/slide1.png")} alt="slide 1 " />
          </div>
        </div>
        {/******************** Card2 ********************************/}
        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <div className="left-content-titel">
              <p>The Leader in online Learning</p>
              <h1>
                Build in <p className="">Learning</p>
              </h1>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
                illum temporibus adipisci iste aspernatur facilis corrupti
                maxime dicta consectetur error voluptas consequatur
                necessitatibus?
              </p>
            </div>
          </div>
          <div
            className="right-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-left"
          >
            <img src={require("../../img/slider/slide2.png")} alt="slide 1 " />
          </div>
        </div>
        {/******************** Card3 ********************************/}
        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <div className="left-content-titel">
              <p>Welcome to New</p>
              <h1>
                Way to <p className="">Education</p>
              </h1>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
                illum temporibus adipisci iste aspernatur facilis corrupti
                maxime dicta consectetur error voluptas consequatur
                necessitatibus?
              </p>
            </div>
          </div>
          <div
            className="right-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-left"
          >
            <img src={require("../../img/slider/slide3.png")} alt="slide 1 " />
          </div>
        </div>
        {/******************** Card4 ********************************/}
        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <div className="left-content-titel">
              <p>here you can review some </p>
              <h1>
                college 2023 <p className="">center</p>
              </h1>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
                illum temporibus adipisci iste aspernatur facilis corrupti
                maxime dicta consectetur error voluptas consequatur
                necessitatibus?
              </p>
            </div>
          </div>
          <div
            className="right-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-left"
          >
            <img src={require("../../img/slider/slide4.png")} alt="slide 1 " />
          </div>
        </div>
        {/******************** Card5 ********************************/}
        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <div className="left-content-titel">
              <p>take the first step</p>
              <h1>
                to knowledge <p className="">with us</p>
              </h1>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
                labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
                illum temporibus adipisci iste aspernatur facilis corrupti
                maxime dicta consectetur error voluptas consequatur
                necessitatibus?
              </p>
            </div>
          </div>
          <div
            className="right-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-left"
          >
            <img src={require("../../img/slider/slide5.png")} alt="slide 1 " />
          </div>
        </div>
      </AutoplaySlider>
      {/* <div className="spikes-rotated"></div> */}
      {/* <div className="m-20">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} Post={p} />
        ))}
      </div> */}
      <Stuff />
      <SammaryData />
      <WhatOffer />
      <Footer />
    </React.Fragment>
  );
}
export default StudentHomePage;
