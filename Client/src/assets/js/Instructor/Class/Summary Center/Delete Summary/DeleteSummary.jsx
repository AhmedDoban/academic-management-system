import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import "./DeleteSummary.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteSummaryLocal,
  GetAllSummary,
  DeleteSummaryApi,
} from "../../../../../Toolkit/Slices/SummarySlice";

function DeleteSummary() {
  const params = useParams();

  const Dispatch = useDispatch();
  const { Summary } = useSelector((state) => state.Summary);

  useEffect(() => {
    Dispatch(GetAllSummary(params.Subject_id));
  }, []);

  const HandleDeleteSummary = (data) => {
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
          DeleteSummaryApi({
            Subject_Id: data.Subject_Id,
            _id: data._id,
          })
        );
        Dispatch(DeleteSummaryLocal(data._id));
      }
    });
  };

  return (
    <React.Fragment>
      {Summary.length > 0 ? (
        <div className="DeleteSummary">
          <div className="container">
            {Summary.map((pdf) => (
              <div className="card" key={pdf._id} data-aos="zoom-in">
                <div className="data">
                  <h1>{pdf.Title}</h1>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => HandleDeleteSummary(pdf)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="No_Summary">
          <div className="container">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../../img/Players/NoSummary.json")}
              className="No_SummaryPlayer"
            />
            <p>There is No Summary </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default DeleteSummary;
