import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./landing.css";
function Landing() {
  return (
    <React.Fragment>
      <div className="landing">
        <div className="container">
          <div
            className="left"
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
                  strings: [
                    "Easy learn ",
                    "Enjoy",
                    "Login to take this feature",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
            <Link to="login">login</Link>
          </div>
          <div className="right">
            <img
              src={require("../../../../img/landing-img.svg").default}
              alt=""
              data-aos="zoom-out"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Landing;
