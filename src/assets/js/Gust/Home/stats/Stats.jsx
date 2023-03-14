import React from "react";
import CountUp from "react-countup";
import "./Stats.css";
function Stats() {
  return (
    <React.Fragment>
      <div className="stats">
        <div
          className="container"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          <div className="left">
            <img
              src={require("../../../../img/stats-img.svg").default}
              alt=""
            />
          </div>

          <div className="right">
            <div className="stats-box">
              <span className="purecounter">
                <CountUp start={0} end={500} duration={2} separator=" " />
              </span>
              <p>Student</p>
            </div>

            <div className="stats-box">
              <span className="purecounter">
                <CountUp start={0} end={500} duration={2} separator=" " />
              </span>
              <p>Books</p>
            </div>

            <div className="stats-box">
              <span className="purecounter">
                <CountUp start={0} end={500} duration={2} separator=" " />
              </span>
              <p>instractors</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Stats;
