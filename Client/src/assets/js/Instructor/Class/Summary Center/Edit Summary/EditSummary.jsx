import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./EditSummary.css";
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllSummary,
  UpdateSummary,
  UpdateSummaryLocal,
} from "../../../../../Toolkit/Slices/SummarySlice";

function EditSummary() {
  const params = useParams();

  const Dispatch = useDispatch();
  const { Summary } = useSelector((state) => state.Summary);

  useEffect(() => {
    Dispatch(GetAllSummary(params.Subject_id));
  }, []);

  const [ValidData, SetValidData] = useState(false);
  const [data, setData] = useState({
    Title: "",
    Subject_Id: params.Subject_id,
    _id: "",
  });

  const HandeChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    },
    [data]
  );

  const HandleEditSummary = (e) => {
    setData({
      Title: e.Title,
      _id: e._id,
      Subject_Id: params.Subject_id,
    });
    SetValidData(true);
  };

  const HandleUpdateSummary = () => {
    Dispatch(UpdateSummary(data));
    Dispatch(UpdateSummaryLocal(data));
  };

  return (
    <React.Fragment>
      {ValidData ? (
        <div className="EditSummary">
          <div className="container">
            {/********************************** Summary Title *******************************/}
            <div className="input-card" data-aos="zoom-in">
              <input
                type="text"
                name="Title"
                id="Title"
                value={data.Title}
                onChange={(e) => HandeChange(e)}
                placeholder=" "
              />
              <label htmlFor="Title">Summary Title</label>
            </div>

            {/********************************** Submit  *******************************/}
            <div className="input-card">
              <button onClick={() => SetValidData(false)}>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../../img/Players/Back.json")}
                  style={{ width: "50px", height: "30px" }}
                />
                Back
              </button>

              <button onClick={() => HandleUpdateSummary()}>
                update
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../../img/Players/Upload.json")}
                  style={{ width: "50px", height: "30px" }}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="EditSummary">
          <div className="container">
            {Summary.map((summary) => (
              <div className="card">
                <div className="data" data-aos="zoom-in">
                  <span>{summary.Title}</span>
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => HandleEditSummary(summary)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default EditSummary;
