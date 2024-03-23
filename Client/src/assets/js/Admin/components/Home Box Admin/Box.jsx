import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import "./Box.css";
import { Player } from "@lottiefiles/react-lottie-player";

function Box(props) {
  return (
    <React.Fragment>
      <Link to={props.link} className="box-card-Admin" data-aos="zoom-in">
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src={props.linkPlayer}
          className="playerData"
        />
        <p>
          <CountUp start={0} end={props.data} duration={2} separator=" " />
        </p>
        <h5>{props.Titel}</h5>
      </Link>
    </React.Fragment>
  );
}
export default Box;
