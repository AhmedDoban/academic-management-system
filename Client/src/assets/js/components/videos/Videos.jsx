import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import Mountain from "../Mountain Template/Mountain";
import "./Videos.css";
import Dots from "../Dots/Dots";
import { useDispatch, useSelector } from "react-redux";
import { GetAllVideos } from "../../../Toolkit/Slices/VideosSlice";
import VideoPlayer from "./VideoPlayer";

function Viedos() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { Videos } = useSelector((state) => state.Videos);
  const [SingleVideo, SetSingleVideo] = useState({});

  useEffect(() => {
    Dispatch(GetAllVideos(params.Subject_id));
  }, []);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Videos</h1>
        </div>
      </Mountain>
      {Videos.length > 0 ? (
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
                    {Videos.map((video) => (
                      <li onClick={() => SetSingleVideo(video)} key={video._id}>
                        <div className="img">
                          <img src={video.Thumbnail} alt={video.Title} />
                        </div>
                        <div className="data">
                          {video.Title}
                          <span>{video?.createdAt.split("T")[0]}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  {SingleVideo.Video ? (
                    <React.Fragment>
                      <div className="VideoPlayerStyle">
                        <VideoPlayer src={SingleVideo.Video} />
                      </div>
                      <div className="info">
                        <span>{SingleVideo.Title}</span>
                        <p>{SingleVideo.Description}</p>
                      </div>
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
