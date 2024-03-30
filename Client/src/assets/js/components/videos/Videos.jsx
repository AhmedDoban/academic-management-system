import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import Mountain from "../Mountain Template/Mountain";
import "./Videos.css";
import Dots from "../Dots/Dots";

function Viedos(props) {
  const params = useParams();
  const [Video, SetVideo] = useState([]);
  const [VideoSRC, SetVideoSRC] = useState("");
  const [Videotitle, SetVideotitle] = useState("");

  const url = props.url;

  const HandleViewVideo = (data) => {
    SetVideoSRC(data.video_link);
    SetVideotitle(data.video_title);
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Videos</h1>
        </div>
      </Mountain>
      {Video.length > 0 ? (
        <div className="specific-course">
          <div className="video" id="video">
            <Dots OtherStyle="top" />
            <Dots OtherStyle="bottom" />
            <div className="container" id="course">
              <div className="holder" data-aos="fade-down">
                <div className="left">
                  <div className="top-video">
                    <p>Videos</p>
                  </div>
                  <ul>
                    {Video.map((video) => (
                      <li
                        onClick={() => HandleViewVideo(video)}
                        key={video.video_id}
                      >
                        <div className="img">
                          <img
                            src={video.video_image_link}
                            alt={video.video_title}
                          />
                        </div>
                        <div className="data">
                          {video.video_title}
                          <span>{video.video_date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  {VideoSRC ? (
                    <React.Fragment>
                      <iframe className="Frame" src={VideoSRC}></iframe>
                      <div className="info">{Videotitle}</div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src={require("../../../img/Players/Select.json")}
                        className="NoSelectedPlayer"
                      />
                      <p>Select Video </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="No_Videos">
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src={require("../../../img/Players/NoViedo.json")}
            className="NoVidosPlayer"
          />
          <p>There is No Videos </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Viedos;
