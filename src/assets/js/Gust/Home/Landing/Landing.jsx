import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./landing.css";
function Landing() {
  return (
    <React.Fragment>
      <div className="landing">
        <div
          className="container"
          data-aos="zoom-in-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          <h2>
            Welcome to <span>academic management system</span>
          </h2>

          <span className="typeWriter">
            <Typewriter
              options={{
                strings: ["Easy learn ", "Enjoy", "Login to take this feature"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
          <Link to="login">login</Link>
        </div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave1">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="3"
              fill="rgba(255,255,255, .1)"
            />
          </g>
          <g className="wave2">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="0"
              fill="rgba(255,255,255, .2)"
            />
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" />
          </g>
        </svg>
      </div>
    </React.Fragment>
  );
}
export default Landing;
