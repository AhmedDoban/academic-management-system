import React, { Component } from "react";
import { Posts } from "../../../dummyData";
import Post from "./Post";
import Share from "./Share";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import Stuff from "./Stuff";

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
        <div>
          <div
            className="left-content"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1>Header 1</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
              illum temporibus adipisci iste aspernatur facilis corrupti maxime
              dicta consectetur error voluptas consequatur necessitatibus?
            </p>
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

        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <h1>Header 2</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
              illum temporibus adipisci iste aspernatur facilis corrupti maxime
              dicta consectetur error voluptas consequatur necessitatibus?
            </p>
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

        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fad-right"
          >
            <h1>Header 3</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
              illum temporibus adipisci iste aspernatur facilis corrupti maxime
              dicta consectetur error voluptas consequatur necessitatibus?
            </p>
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

        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <h1>Header 4</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
              illum temporibus adipisci iste aspernatur facilis corrupti maxime
              dicta consectetur error voluptas consequatur necessitatibus?
            </p>
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

        <div>
          <div
            className="left-content"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
            data-aos="fade-right"
          >
            <h1>Header 5</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              labore quibusdam aspernatur. Necessitatibus, quis neque? Cumque,
              illum temporibus adipisci iste aspernatur facilis corrupti maxime
              dicta consectetur error voluptas consequatur necessitatibus?
            </p>
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
      <div className="spikes-rotated"></div>
      {/* <div className="m-20">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} Post={p} />
        ))}
      </div> */}
      <Stuff />
    </React.Fragment>
  );
}
export default StudentHomePage;
