import React, { useState } from "react";
import axios from "axios";
import Mountain from "../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Exams.css";

function EditExam() {
  const params = useParams("");
  const [file_attachment, Setfile_attachment] = useState(null);
  const [progress, setProgress] = useState();

  const HandleUploadPDF = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file_attachment", file_attachment[0]);
    formData.append("exam_id", params.exam_id);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/doctor/upload_exam_papel_pdf.php`,
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

  const HandelDeleteExam = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}doctor/delete_exam.php`,
          {
            exam_id: params.exam_id,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
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
            to={`EditExam/${params.exam_id}`}
            data-aos="zoom-in"
          >
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets2.lottiefiles.com/packages/lf20_acxjjfqm.json"
              className="ExamPlayer"
            />
            <p>Edit exam</p>
          </Link>
          <Link className="editExam-card" to={`addQu`} data-aos="zoom-in">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets1.lottiefiles.com/packages/lf20_alyseq4q.json"
              className="ExamPlayer"
            />
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
              />
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
                />
                Click here to upload
              </button>
              <div className="progressbar">
                <p className="progress" style={{ width: `${progress}%` }}></p>
              </div>
            </div>
          </div>

          <button
            className="editExam-card button"
            onClick={() => HandelDeleteExam()}
          >
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets1.lottiefiles.com/private_files/lf30_rj4ooq2j.json"
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
