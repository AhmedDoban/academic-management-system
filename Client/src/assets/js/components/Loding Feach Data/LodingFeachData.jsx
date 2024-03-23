import React from "react";
import "./LodingFeachData.css";
import { Player } from "@lottiefiles/react-lottie-player";
function LodingFeachData() {
  return (
    <React.Fragment>
      <div className="Loding-feachData">
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src="https://assets2.lottiefiles.com/packages/lf20_x62chJ.json"
          className="player"
        />
        <span>Loading</span>
      </div>
    </React.Fragment>
  );
}
export default LodingFeachData;
