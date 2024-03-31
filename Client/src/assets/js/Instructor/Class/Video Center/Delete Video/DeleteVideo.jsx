import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DeleteVideo.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteVideoLocal,
  DeleteVideos,
  GetAllVideos,
} from "../../../../../Toolkit/Slices/VideosSlice";

function DeleteVideo() {
  const params = useParams("");
  const Dispatch = useDispatch();

  const { Videos } = useSelector((state) => state.Videos);

  useEffect(() => {
    Dispatch(GetAllVideos(params.Subject_id));
  }, []);

  const handleDeletevideo = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Delete ${data.Title} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        Dispatch(
          DeleteVideos({
            _id: data._id,
            Subject_Id: data.Subject_Id,
          })
        );
        Dispatch(DeleteVideoLocal(data._id));
      }
    });
  };
  return (
    <React.Fragment>
      <div className="DeleteVideo">
        <div className="container">
          {Videos.map((Vi) => (
            <div className="card" data-aos="zoom-in">
              <div className="data">
                <span>{Vi.Title}</span>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDeletevideo(Vi)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default DeleteVideo;
