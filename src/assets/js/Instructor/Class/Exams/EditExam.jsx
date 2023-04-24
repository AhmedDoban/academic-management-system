import React, { useState, useEffect } from "react";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Exams.css";

function EditExam() {
  const params = useParams("");
  const [file_attachment, Setfile_attachment] = useState(null);
  const [progress, setProgress] = useState();
  console.log(params)
  const HandleUploadPDF = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file_attachment", file_attachment[0]);
    formData.append("exam_id", params.exam_id);
    try {
      await axios
        .post(
          "https://camp-coding.tech/fci_project/graduation/doctor/upload_exam_papel_pdf.php",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (data) => {
              setProgress(Math.round((100 * data.loaded) / data.total));
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            Setfile_attachment(null);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> {params.examName}</h1>
        </div>
      </Mountain>
      <div className="editExam">
        <div className="container">
          <Link
            className="editExam-card"
            // to={`EditExam/${Exam.exam_id}/${Exam.exam_name}?`}
          >
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets2.lottiefiles.com/packages/lf20_acxjjfqm.json"
              className="ExamPlayer"
            ></Player>
            <p>Edit exam</p>
          </Link>
          <Link className="editExam-card" to={`addQu`}>
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets1.lottiefiles.com/packages/lf20_alyseq4q.json"
              className="ExamPlayer"
            ></Player>
            <p>Add New Question</p>
          </Link>
          <div
            className={
              file_attachment === null
                ? "editExam-card flip"
                : "editExam-card flip active"
            }
          >
            <label className="face front" htmlFor="PDFEdit">
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets7.lottiefiles.com/packages/lf20_onjuzgsi.json"
                className="ExamPlayer"
              ></Player>
              <p>Edit PDF</p>
            </label>
            <div className="face back">
              <input
                type="file"
                id="PDFEdit"
                onChange={(event) => Setfile_attachment(event.target.files)}
              />
              <button className="uploadFileBTN" onClick={HandleUploadPDF}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets8.lottiefiles.com/packages/lf20_z7DhMX.json"
                  className="uploadFileBTNplayer"
                ></Player>
                Click here to upload
              </button>
              <div className="progressbar">
                <p className="progress" style={{ width: `${progress}%` }}></p>
              </div>
            </div>
          </div>

          <button className="editExam-card button">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets1.lottiefiles.com/private_files/lf30_rj4ooq2j.json"
              className="ExamPlayer"
            ></Player>
            <p>Delete Exam</p>
          </button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default EditExam;
