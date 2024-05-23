import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "./Slider.css";
function Slider() {
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
          <div className="left-content" data-aos="fade-right">
            <div className="left-content-title">
              <p>The Best</p>
              <h1>
                Education <p className="">Experience</p>
              </h1>
            </div>
            <div>
              <p>
                “ There is no end to education. It is not that you read a book,
                pass an examination, and finish with education. The whole of
                life, from the moment you are born to the moment you die, is a
                process of learning. ” —{" "}
                <span className="color-red ">Jiddu Krishnamurti</span>
              </p>
            </div>
          </div>
          <div className="right-content" data-aos="fade-left">
            <img
              src={require("../../../../img/slider/slide1.png")}
              alt="slide 1 "
              loading="lazy"
            />
          </div>
        </div>
        {/******************** Card2 ********************************/}
        <div>
          <div className="left-content" data-aos="fade-right">
            <div className="left-content-title">
              <p>The Leader in online Learning</p>
              <h1>
                Build in <p className="">Learning</p>
              </h1>
            </div>
            <div>
              <p>
                “One hour per day of study in your chosen field is all it takes.
                One hour per day of study will put you at the top of your field
                within three years. Within five years you’ll be a national
                authority. In seven years, you can be one of the best people in
                the world at what you do.” —{" "}
                <span className="color-red ">Earl Nightingale</span>
              </p>
            </div>
          </div>
          <div className="right-content" data-aos="fade-left">
            <img
              src={require("../../../../img/slider/slide2.png")}
              alt="slide 2 "
              loading="lazy"
            />
          </div>
        </div>
        {/******************** Card3 ********************************/}
        <div>
          <div className="left-content" data-aos="fade-right">
            <div className="left-content-title">
              <p>Welcome to New</p>
              <h1>
                Way to <p className="">Education</p>
              </h1>
            </div>
            <div>
              <p>
                “Research shows that you begin learning in the womb and go right
                on learning until the moment you pass on. Your brain has a
                capacity for learning that is virtually limitless, which makes
                every human a potential genius.” —{" "}
                <span className="color-red ">Michael J. Gelb</span>
              </p>
            </div>
          </div>
          <div className="right-content" data-aos="fade-left">
            <img
              src={require("../../../../img/slider/slide3.png")}
              alt="slide 3 "
              loading="lazy"
            />
          </div>
        </div>
        {/******************** Card4 ********************************/}
        <div>
          <div className="left-content" data-aos="fade-right">
            <div className="left-content-title">
              <p>here you can review some </p>
              <h1>
                college 2023 <p className="">center</p>
              </h1>
            </div>
            <div>
              <p>
                “True teachers are those who use themselves as bridges over
                which they invite their students to cross; then, having
                facilitated their crossing, joyfully collapse, encouraging them
                to create their own.” —{" "}
                <span className="color-red ">Nikos Kazantzakis</span>
              </p>
            </div>
          </div>
          <div className="right-content" data-aos="fade-left">
            <img
              src={require("../../../../img/slider/slide4.png")}
              alt="slide 4 "
              loading="lazy"
            />
          </div>
        </div>
        {/******************** Card5 ********************************/}
        <div>
          <div className="left-content" data-aos="fade-right">
            <div className="left-content-title">
              <p>take the first step</p>
              <h1>
                to knowledge <p className="">with us</p>
              </h1>
            </div>
            <div>
              <p>
                “You can teach a student a lesson for a day; but if you can
                teach him to learn by creating curiosity, he will continue the
                learning process as long as he lives.” —{" "}
                <span className="color-red ">Clay P. Bedford</span>
              </p>
            </div>
          </div>
          <div className="right-content" data-aos="fade-left">
            <img
              src={require("../../../../img/slider/slide5.png")}
              alt="slide 5 "
              loading="lazy"
            />
          </div>
        </div>
      </AutoplaySlider>
    </React.Fragment>
  );
}
export default Slider;
