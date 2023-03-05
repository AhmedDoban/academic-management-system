import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function Box(props) {
  return (
    <React.Fragment>
      <div className={`box`} data-aos="zoom-in">
        <Link to={props.link} className={`${props.otherStyle}`}>
          <i className={props.className}></i>
          <p>
            <CountUp start={0} end={props.data} duration={2} separator=" " />
          </p>
          <span>{props.Titel}</span>
        </Link>
      </div>
    </React.Fragment>
  );
}
export default Box;
