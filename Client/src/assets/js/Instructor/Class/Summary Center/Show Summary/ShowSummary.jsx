import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ShowSummary.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSummary,
  UpdateSummaryShown,
  UpdateSummaryhownLocal,
} from "../../../../../Toolkit/Slices/SummarySlice";

function ShowSummary() {
  const params = useParams();

  const Dispatch = useDispatch();
  const { Summary } = useSelector((state) => state.Summary);

  useEffect(() => {
    Dispatch(GetAllSummary(params.Subject_id));
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
        Dispatch(UpdateSummaryShown(data));
        Dispatch(UpdateSummaryhownLocal(data._id));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="ShowSummary">
        <div className="container">
          {Summary.map((summary) => (
            <div className="card" key={summary._id}>
              <div className="data">
                <span>{summary.Title}</span>
                <div
                  className="controllers"
                  onClick={() => handleShowvideo(summary)}
                >
                  <i
                    className={
                      summary.Shown
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                  />
                  <span>{summary.Shown ? "Shown" : "Hidden"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default ShowSummary;
