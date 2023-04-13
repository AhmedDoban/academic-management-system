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

import avatar1 from "../../../img/avatars/female-1.png";
import avatar2 from "../../../img/avatars/female-2.png";
import avatar3 from "../../../img/avatars/female-3.png";
import avatar4 from "../../../img/avatars/female-4.png";
import avatar5 from "../../../img/avatars/female-5.png";
import avatar6 from "../../../img/avatars/male-1.png";
import avatar7 from "../../../img/avatars/male-2.png";
import avatar8 from "../../../img/avatars/male-3.png";
import avatar9 from "../../../img/avatars/male-4.png";
import avatar10 from "../../../img/avatars/male-5.png";

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
  const { users, tracks, imgavatar, userName } = props;

  const HandleFullView = (e) => {
    let select = document.querySelectorAll(".vid");
    select.forEach((view) => {
      view.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };

  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer
          className="vid active"
          videoTrack={tracks[1]}
          onClick={HandleFullView}
          ref={vedioRef}
        >
          <div className="user-data">
            <img src={imgavatar} alt="avatar" />
            <h1>{userName}</h1>
          </div>
        </AgoraVideoPlayer>

        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  onClick={HandleFullView}
                >
                  <div className="user-data">
                    <img src={imgavatar} alt="avatar" />
                    <h1>{userName}</h1>
                  </div>
                </AgoraVideoPlayer>
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
      ></i>
      <i
        className={
          trackState.video
            ? "fa-solid fa-video yes"
            : "fa-solid fa-video-slash no"
        }
        onClick={() => mute("video")}
      ></i>
      <i
        className={
          trackState.Share
            ? "fa-solid fa-display yes"
            : "fa-solid fa-display no"
        }
        onClick={() => ShareScrean()}
      ></i>

      {
        <i
          className="fa-solid fa-person-walking-dashed-line-arrow-right"
          onClick={() => leaveChannel()}
        ></i>
      }
    </div>
  );
};

const ChannelForm = (props) => {
  const {
    channelName,
    setChannelName,
    handleJoin,
    setimgavatar,
    setUserName,
    userName,
  } = props;
  const [random, setRandom] = useState("");
  useEffect(() => {
    setRandom(uuidv4());
  }, []);
  return (
    <React.Fragment>
      <div className="card">
        <p>Call Room</p>

        <form className="join">
          <div className="avatar-container">
            <div className="custom-avatar">
              <input type="radio" id="ava1" name="fav" />
              <label for="ava1" onClick={() => setimgavatar(avatar1)}>
                <img src={avatar1} alt="ava1" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava2" name="fav" />
              <label for="ava2" onClick={() => setimgavatar(avatar2)}>
                <img src={avatar2} alt="ava2" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava3" name="fav" />
              <label for="ava3" onClick={() => setimgavatar(avatar3)}>
                <img src={avatar3} alt="ava3" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava4" name="fav" />
              <label for="ava4" onClick={() => setimgavatar(avatar4)}>
                <img src={avatar4} alt="ava4" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava5" name="fav" />
              <label for="ava5" onClick={() => setimgavatar(avatar5)}>
                <img src={avatar5} alt="ava5" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava6" name="fav" />
              <label for="ava6" onClick={() => setimgavatar(avatar6)}>
                <img src={avatar6} alt="ava6" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava7" name="fav" />
              <label for="ava7" onClick={() => setimgavatar(avatar7)}>
                <img src={avatar7} alt="ava7" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava8" name="fav" />
              <label for="ava8" onClick={() => setimgavatar(avatar8)}>
                <img src={avatar8} alt="ava8" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava9" name="fav" />
              <label for="ava9" onClick={() => setimgavatar(avatar9)}>
                <img src={avatar9} alt="ava9" />
              </label>
            </div>
            <div className="custom-avatar">
              <input type="radio" id="ava10" name="fav" />
              <label for="ava10" onClick={() => setimgavatar(avatar10)}>
                <img src={avatar10} alt="ava10" />
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
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
    </React.Fragment>
  );
};

const CallRoom = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [userName, setUserName] = useState("");
  const [imgavatar, setimgavatar] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    if (userName === "") {
      toast.error("You Must Enter Your Name", {
        autoClose: 15000,
        theme: "colored",
      });
      return;
    }
    if (imgavatar === "") {
      toast.error("You Must Choose from avatars", {
        autoClose: 15000,
        theme: "colored",
      });
      return;
    }
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
    <div className="video-container">
      {inCall ? (
        <VideoCall
          setInCall={setInCall}
          channelName={channelName}
          userName={userName}
          imgavatar={imgavatar}
        />
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
          handleJoin={handleJoin}
          channelName={channelName}
          setimgavatar={setimgavatar}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CallRoom;
