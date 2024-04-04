import React from "react";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import "./Exams.css";

function EditExam() {
  const params = useParams("");

  const HandelDeleteExam = async () => {};

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
