import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./UploadSammary.css";

function UploadSammary() {
  const params = useParams();
  const [file_attachment, Setfile_attachment] = useState(null);
  const [summery_name, Setsummery_name] = useState("");
  const [progress, setProgress] = useState();

  const HandleUploadPDF = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file_attachment", file_attachment[0]);
    formData.append("summery_name", summery_name);
    formData.append("summary_subject_id", params.subject_id);

    try {
      await axios
        .post(
          "https://camp-coding.tech/fci_project/graduation/doctor/upload_summary.php",
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
          if (response.data.status === "error") {
            toast.warn(response.data.message, {
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
      <div className="uploadsammary">
        <div className="container">
          <div className="card">
            <input
              type="text"
              id="video_title"
              value={summery_name}
              onChange={(e) => Setsummery_name(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="video_title">Smmary Title</label>
          </div>

          <div
            className={
              file_attachment === null ? "card-flip " : "card-flip active"
            }
          >
            <label className="face front" htmlFor="PDFEdit">
              <Player
                autoplay={true}
                loop={true}
                controls={false}
                src="https://assets7.lottiefiles.com/packages/lf20_onjuzgsi.json"
                className="Player"
              ></Player>
              <p>Chose PDF</p>
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
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default UploadSammary;
