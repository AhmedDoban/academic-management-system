import React from "react";
import Blobs from "../../components/Blobs";
import { Link } from "react-router-dom";
import "./ActivityRoom.css";
function ActivityRoom() {
  return (
    <React.Fragment>
      <Blobs />
      <div className="ActivityRoom">
        <div className="container">
          <h1 className="main-titel-2 ">Welcome To Activity Room</h1>
          <div className="activity-container">
            <Link className="box" to="drawing">
              <i class="fa-solid fa-paint-roller"></i>
              <span>Drawing</span>
            </Link>
            <Link className="box" to="memory-game">
              <i class="fa-solid fa-brain"></i>
              <span>Memory Game</span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ActivityRoom;
