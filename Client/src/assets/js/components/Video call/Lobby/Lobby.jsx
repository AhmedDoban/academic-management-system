import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./Lobby.css";

function Lobby({ trackState, setTrackState, setInCall }) {
  const VideoRef = useRef(null);
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    if (trackState.video || trackState.audio) {
      navigator.mediaDevices
        .getUserMedia({
          video: trackState.video,
          audio: trackState.audio,
        })
        .then((stream) => {
          if (VideoRef.current) {
            VideoRef.current.srcObject = stream;
            VideoRef.current.play();
          }
        });
    }
  }, [trackState, VideoRef]);

  const mute = async (type) => {
    if (type === "audio") {
      setTrackState((prev) => {
        return { ...prev, audio: !prev.audio };
      });
    } else if (type === "video") {
      setTrackState((prev) => {
        return { ...prev, video: !prev.video };
      });
    }
  };

  const handleJoin = () => {
    setInCall(true);
  };

  return (
    <React.Fragment>
      <div className="Lobby">
        <div className="bar-head">
          <div className="container">
            <h1>Lobby </h1>
            <div className="actionsFake">
              <div className="bullet"></div>
              <div className="bullet"></div>
              <div className="bullet"></div>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="container">
            <div className="box">
              {trackState.video ? (
                <video ref={VideoRef} muted></video>
              ) : (
                <img src={user.Avatar} alt={user.name} />
              )}
            </div>
          </div>
        </div>
        <div className="bar-bottom">
          <div className="container">
            <div className="actionsFake">
              <div className="bullet">
                <i
                  className={
                    trackState.video
                      ? "fa-solid fa-video yes"
                      : "fa-solid fa-video-slash no"
                  }
                  onClick={() => mute("video")}
                />
              </div>
              <div className="bullet">
                <i
                  className={
                    trackState.audio
                      ? "fa-solid fa-microphone yes"
                      : "fa-solid fa-microphone-slash no"
                  }
                  onClick={() => mute("audio")}
                />
              </div>
            </div>
            <button onClick={() => handleJoin()}>
              Join call <i className="fa-solid fa-right-to-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Lobby;
