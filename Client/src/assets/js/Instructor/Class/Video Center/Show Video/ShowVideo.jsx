import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowVideo.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllVideos,
  UpdateVideoShownLocal,
  UpdateVideosShown,
} from "../../../../../Toolkit/Slices/VideosSlice";

function ShowVideo() {
  const params = useParams("");
  const Dispatch = useDispatch();
  const { Videos } = useSelector((state) => state.Videos);

  useEffect(() => {
    Dispatch(GetAllVideos(params.Subject_id));
  }, []);

  const handleShowvideo = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${data.Shown ? "Hide" : "Show"} ${data.Title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        Dispatch(UpdateVideosShown(data));
        Dispatch(UpdateVideoShownLocal(data._id));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="ShowVideo">
        <div className="container">
          {Videos.map((Vi) => (
            <div className="card" key={Vi._id}>
              <div className="data">
                <span>{Vi.Title}</span>
                <div
                  className="controllers"
                  onClick={() => handleShowvideo(Vi)}
                >
                  <i
                    className={
                      Vi.Shown ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                    }
                  />
                  <span>{Vi.Shown ? "Shown" : "Hidden"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default ShowVideo;
