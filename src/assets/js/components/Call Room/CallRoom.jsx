import "./CallRoom.css";
import React, { useEffect, useState, useRef } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
} from "agora-rtc-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
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
  const { setInCall, channelName, userName, imgavatar } = props;
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
      {start && tracks && (
        <Videos
          users={users}
          tracks={tracks}
          userName={userName}
          imgavatar={imgavatar}
        />
      )}
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
    </div>
  );
};

const Videos = (props) => {
  const vedioRef = useRef();
  const { users, tracks } = props;

  return (
    <div className="videos">
      <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} ref={vedioRef} />
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

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
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
  const { channelName, setChannelName, handleJoin } = props;
  const [random, setRandom] = useState("");
  useEffect(() => {
    setRandom(uuidv4());
  }, []);
  return (
    <React.Fragment>
      <div className="ChannelForm">
        <div className="container">
          <div className="card">
            <p>Call Room</p>
            <form className="join">
              <input
                type="search"
                placeholder="Enter Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
                value={channelName}
              />
              <button onClick={(e) => handleJoin(e)} className="submit-btn">
                Join
              </button>
            </form>
            <div className="random-channal">
              <h5>Random Channel</h5>
              <div className="data">
                <p>{random}</p>
                <CopyToClipboard text={random}>
                  <i className="fa-regular fa-clone CopyToClipboard"></i>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const CallRoom = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    if (channelName === "") {
      toast.error("You Must Enter Channel Name", {
        autoClose: 15000,
        theme: "colored",
      });
      return;
    }
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
            setChannelName={setChannelName}
            handleJoin={handleJoin}
            channelName={channelName}
          />
        </React.Fragment>
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default CallRoom;
