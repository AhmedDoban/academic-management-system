import "./FriendsCall.css";
import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
} from "agora-rtc-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { v4 as uuidv4 } from "uuid";

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
        console.log("subscribe success");
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
        console.log("unpublished", user, type);
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
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
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
      <div id="videos">
        <AgoraVideoPlayer className="vid active" videoTrack={tracks[1]} />
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
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    console.log("client", client);
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
  const { setInCall, setChannelName } = props;
  const [random, setRandom] = useState("");
  useEffect(() => {
    setRandom(uuidv4());
  }, []);
  return (
    <React.Fragment>
      <div className="card">
        <p>Call Room</p>
        <form className="join">
          <input
            type="text"
            placeholder="Enter Channel Name"
            onChange={(e) => setChannelName(e.target.value)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setInCall(true);
            }}
            className="submit-btn"
          >
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

const CallFriend = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div className="video-container">
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

export default CallFriend;
