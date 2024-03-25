import React, { useState } from "react";
import "./Class.css";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";
import LodingFeachData from "./../../components/Loding Feach Data/LodingFeachData";

function Class() {
  const [Classes, SetClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [CreateField, SetCreateField] = useState(false);

  const [Data, SetData] = useState({
    subject_name: "",
    subject_description: "",
    generation_id: "",
  });

  const HandeADD = async () => {
    const CloneData = [...Classes];
    CloneData.push(Data);
    SetClasses(CloneData);
    SetCreateField(false);
  };

  return (
    <React.Fragment>
      <div className="classRoom">
        <Mountain>
          <div className="data">
            <h1> Class Room</h1>
            <div className="card">
              <i
                className="fa-solid fa-plus"
                onClick={() => SetCreateField(!CreateField)}
              />
              <input type="text" placeholder="Create a New Class" disabled />
            </div>
          </div>
        </Mountain>

        {/***************** Classes  **********************/}
        <div className="subjects">
          {loading ? (
            <LodingFeachData />
          ) : CreateField ? (
            <div className="add-new-Class">
              <div className="container">
                <div className="card-input">
                  <input
                    type="search"
                    id="subject_name"
                    value={Data.subject_name}
                    onChange={(e) =>
                      SetData({ ...Data, subject_name: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label htmlFor="subject_name">Subject Name</label>
                </div>
                <div className="card-input">
                  <input
                    type="search"
                    id="subject_description"
                    value={Data.subject_description}
                    onChange={(e) =>
                      SetData({
                        ...Data,
                        subject_description: e.target.value,
                      })
                    }
                    placeholder=" "
                  />
                  <label htmlFor="subject_description">
                    Subject Description
                  </label>
                </div>
                <div className="card-input">
                  <input
                    type="search"
                    id="generation_id"
                    value={Data.generation_id}
                    onChange={(e) =>
                      SetData({ ...Data, generation_id: e.target.value })
                    }
                    placeholder=" "
                  />
                  <label htmlFor="generation_id">Generation Id</label>
                </div>
                <div className="card-input">
                  <button onClick={() => HandeADD()}> Add</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              {Classes.map((p) => (
                <Link
                  className="card"
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-out"
                  data-aos-duration="1000"
                  to={`/subjects/${p.subject_id}/${p.subject_name}?`}
                  key={p.subject_id}
                >
                  <h1>{p.subject_name}</h1>
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                    style={{ width: "100px", height: "150px" }}
                  ></Player>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/***************** End **********************/}
      </div>
    </React.Fragment>
  );
}
export default Class;
