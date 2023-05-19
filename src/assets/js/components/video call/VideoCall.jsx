import "./VideoCall.css";
import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
} from "agora-rtc-react";

import "react-toastify/dist/ReactToastify.min.css";
import { useParams } from "react-router-dom";
import Mountain from "./../Mountain Template/Mountain";

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

const appId = "f32a45e51edd4852b2d7dc8748f78b52";
// const appId = "1ab3f923ed67455f81c8e4252d91fbc5";
const token = null;

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="App">
      {start && tracks && <Videos users={users} tracks={tracks} />}
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
    </div>
  );
};

const Videos = (props) => {
  const { users, tracks } = props;

  return (
    <div>
      <div className="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        <div className="other-users">
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    className="vid"
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                );
              } else return null;
            })}
        </div>
      </div>
    </div>
  );
};

export const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
    Share: false,
  });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };
  const ShareScrean = async () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({
        audio: true,
        vedio: {
          curser: "always",
        },
      });
    }
  };

  return (
    <div className="controls">
      <i
        className={
          trackState.audio
            ? "fa-solid fa-microphone yes"
            : "fa-solid fa-microphone-slash no"
        }
        onClick={() => mute("audio")}
      >
        <span>{trackState.audio ? "microphone" : "unmute"}</span>
      </i>
      <i
        className={
          trackState.video
            ? "fa-solid fa-video yes"
            : "fa-solid fa-video-slash no"
        }
        onClick={() => mute("video")}
      >
        <span>{trackState.video ? "video" : "unmute"}</span>
      </i>
      <i
        className={
          trackState.Share
            ? "fa-solid fa-display yes"
            : "fa-solid fa-display no"
        }
        onClick={() => ShareScrean()}
      >
        <span>{trackState.Share ? "Stop" : "Share Screen"}</span>
      </i>

      {
        <i
          className="fa-solid fa-person-walking-dashed-line-arrow-right"
          onClick={() => leaveChannel()}
        >
          <span>End Meeting</span>
        </i>
      }
    </div>
  );
};

const ChannelForm = (props) => {
  const { channelName, handleJoin, SubjectName } = props;

  return (
    <React.Fragment>
      <div className="ChannelForm">
        <div className="container">
          <div className="card">
            <p>Call Room</p>

            <form className="join">
              <input
                type="search"
                placeholder={channelName}
                value={channelName}
                readOnly
              />
              <input
                type="search"
                placeholder={SubjectName}
                value={SubjectName}
                readOnly
              />
              <button onClick={(e) => handleJoin(e)} className="submit-btn">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const JoinRoom = (props) => {
  const params = useParams();
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [SubjectName, SetSubjectName] = useState("");

  useEffect(() => {
    setChannelName(
      params.id
        .split("")
        .map((p) => p.charCodeAt())
        .join("")
    );
    SetSubjectName(params.id);
  }, [params.id]);

  const handleJoin = (e) => {
    e.preventDefault();
    setInCall(true);
  };

  return (
    <React.Fragment>
      {inCall ? (
        <div className="video-container">
          <VideoCall setInCall={setInCall} channelName={channelName} />
        </div>
      ) : (
        <React.Fragment>
          <Mountain>
            <div className="data">
              <h1>Call Room</h1>
            </div>
          </Mountain>

          <ChannelForm
            setInCall={setInCall}
            handleJoin={handleJoin}
            channelName={channelName}
            SubjectName={SubjectName}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default JoinRoom;
