import React, { lazy } from "react";
import { useParams, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./VideoCenter.css";

const NewVideo = lazy(() => import("./New Video/NewVideo"));
const DeleteVideo = lazy(() => import("./Delete Video/DeleteVideo"));
const EditVideo = lazy(() => import("./Edit Video/EditVideo"));
const ShowVideo = lazy(() => import("./Show Video/ShowVideo"));

function VideoCenter() {
  const params = useParams("");

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.SubjectName}</h1>
        </div>
      </Mountain>
      <div className="videoCenter">
        <div className="container">
          <div className="menu">
            <ul>
              <li>
                <NavLink to="" end>
                  Add
                </NavLink>
              </li>
              <li>
                <NavLink to="DeleteVideo">Delete Video</NavLink>
              </li>
              <li>
                <NavLink to="EditVideo">Edit Video</NavLink>
              </li>
              <li>
                <NavLink to="showVideo">show Video</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="" exact element={<NewVideo />} />
        <Route path="DeleteVideo" element={<DeleteVideo />} />
        <Route path="EditVideo" element={<EditVideo />} />
        <Route path="showVideo" element={<ShowVideo />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
export default VideoCenter;
