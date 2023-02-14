import React from "react";
import Blobs from "../../components/Blobs";
import { Link } from "react-router-dom";
import "./ActivityRoom.css";
import CardBlur from "../../components/CardBlur";
function ActivityRoom() {
  return (
    <React.Fragment>
      <Blobs />
      <div className="ActivityRoom">
        <div className="container">
          <h1 className="main-titel-2 ">Welcome To Activity Room</h1>
          <div className="activity-container">
            <Link className="box" to="drawing">
              <CardBlur>
                <img
                  src={require("../../../img/ActivityRoom/color-palette.png")}
                  alt="Drawing"
                />
                <span>Drawing</span>
              </CardBlur>
            </Link>

            <Link className="box" to="memory-game">
              <CardBlur>
                <img
                  src={require("../../../img/ActivityRoom/card-games.png")}
                  alt="Memory Game"
                />
                <span>Memory Game</span>
              </CardBlur>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ActivityRoom;
