import React, { useEffect, useState } from "react";
import "./StudentFriends.css";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";
const AppId = "847c87d19cfd416597e7239fee2cf785";
const Token =
  "007eJxTYHDi/OOhImTPWyjz6eUNz7Tj+lPmp8pOfZjCM9n1x+s9VzkVGCxMzJMtzFMMLZPTUkwMzUwtzVPNjYwt01JTjZLTzC1MD3r+Sm4IZGTo3RfFwAiFID4Lg3NiTg4DAwAEAh8U";
const Chanal = "Call";

const Client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

function CallFriend() {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await Client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    Client.on("user-published", handleUserJoined);
    Client.on("user-left", handleUserLeft);

    Client.join(AppId, Chanal, Token, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);

        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        Client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      Client.off("user-published", handleUserJoined);
      Client.off("user-left", handleUserLeft);
      Client.unpublish(localTracks).then(() => Client.leave());
    };
  }, []);

  return (
    <React.Fragment>
      <div className="video-container">
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </React.Fragment>
  );
}
export default CallFriend;
