import React from "react";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Exams.css";
import { useDispatch } from "react-redux";
import { DeleteSingleExam } from "../../../../Toolkit/Slices/ExamsSlice";
import Swal from "sweetalert2";

function EditExam() {
  const params = useParams("");
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  const HandelDeleteExam = async () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to Delete this Exam",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        Dispatch(
          DeleteSingleExam({
            Subject_id: params.Subject_id,
            _id: params.Exam_id,
          })
        ).then((res) => {
          if (res.payload.Status !== "Faild") {
            Navigate(-1);
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Edit Exam</h1>
        </div>
      </Mountain>
      <div className="editExam">
        <div className="container" data-aos="fade-down">
          <Link className="editExam-card" to={`Edit`}>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/EditExam.json")}
              className="ExamPlayer"
            />
            <p>Edit exam</p>
          </Link>
          <Link className="editExam-card" to={`AddQuestion`}>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/AddNewQu.json")}
              className="ExamPlayer"
            />
            <p>Add New Question</p>
          </Link>

          <button
            className="editExam-card button"
            onClick={() => HandelDeleteExam()}
          >
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../../img/Players/Delete.json")}
              className="ExamPlayer"
            />
            <p>Delete Exam</p>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default EditExam;
