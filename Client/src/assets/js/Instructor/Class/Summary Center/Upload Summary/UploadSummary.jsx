import React, { useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import "./UploadSummary.css";
import Toast_Handelar from "../../../../components/Toast_Handelar";

function UploadSummary() {
  const params = useParams();
  const [file_attachment, Setfile_attachment] = useState(null);
  const [Title, SetTitle] = useState("");
  const [progress, setProgress] = useState();

  const HandleUploadPDF = async (e) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Summary/Add`,
          {
            PDF: file_attachment,
            Title: Title,
            Subject_Id: params.Subject_id,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Token,
            },
            onUploadProgress: (e) => {
              const progress = (e.loaded / e.total) * 100;
              setProgress(progress);
            },
          }
        )
        .then((res) => {
          if (res.data.Status !== "Faild") {
            Toast_Handelar("success", res.data.message);
          } else {
            Toast_Handelar("error", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't Add Summary !");
    }
  };

  const HandleDeleteChosenPdf = () => {
    Setfile_attachment(null);
    setProgress(0);
  };

  return (
    <React.Fragment>
      <div className="uploadSummary">
        <div className="container">
          <div className="card" data-aos="zoom-in">
            <input
              type="text"
              id="video_title"
              value={Title}
              onChange={(e) => SetTitle(e.target.value)}
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
                src={require("../../../../../img/Players/NoSummary.json")}
                className="Player"
              />
              <p>Chose PDF</p>
            </label>
            <div className="face back">
              <button
                className="RemovePDF"
                onClick={() => HandleDeleteChosenPdf()}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <input
                type="file"
                id="PDFEdit"
                onChange={(event) => Setfile_attachment(event.target.files[0])}
              />
              <button className="uploadFileBTN" onClick={HandleUploadPDF}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../../img/Players/Upload.json")}
                  className="uploadFileBTNplayer"
                />
                Click here to upload
              </button>
              <div className="progressbar">
                <p className="progress" style={{ width: `${progress}%` }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default UploadSummary;
