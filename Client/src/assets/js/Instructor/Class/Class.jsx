import React, { useEffect, useState } from "react";
import "./Class.css";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";
import LodingFeachData from "./../../components/Loding Feach Data/LodingFeachData";
import { useDispatch, useSelector } from "react-redux";
import { GetAllInstructorSubjects } from "../../../Toolkit/Slices/SemestersSlice";
import Select from "react-select";

function Class() {
  const Dispatcth = useDispatch();

  const { loading, Subjects } = useSelector((State) => State.Semester);
  const [CreateField, SetCreateField] = useState(false);

  const [Data, SetData] = useState({
    name: "",
    credit_hours: "",
    day: "",
    time: "",
  });

  const Days = [
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
  ];
  const time = [
    { label: "9-11", value: "9-11" },
    { label: "11-1", value: "11-1" },
    { label: "1-3", value: "1-3" },
    { label: "3-5", value: "3-5" },
  ];
  useEffect(() => {
    Dispatcth(GetAllInstructorSubjects());
  }, []);

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
                  <Select options={time} menuPlacement="auto" />
                </div>
                <div className="card-input">
                  <input
                    type="search"
                    id="name"
                    value={Data.name}
                    onChange={(e) => SetData({ ...Data, name: e.target.value })}
                    placeholder=" "
                  />
                  <label htmlFor="subject_name">Subject Name</label>
                </div>
                <div className="card-input">
                  <input
                    type="search"
                    id="credit_hours"
                    value={Data.credit_hours}
                    onChange={(e) =>
                      SetData({
                        ...Data,
                        credit_hours: e.target.value,
                      })
                    }
                    placeholder=" "
                  />
                  <label htmlFor="credit_hours">credit hours</label>
                </div>
                <div className="card-input">
                  <Select options={Days} menuPlacement="auto" />
                </div>

                <div className="card-input">
                  <button> Add</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container" data-aos="fade-in">
              {Subjects.map((Subject) => (
                <Link
                  className="card"
                  to={`/subjects/${Subject._id}/${Subject.name}?`}
                  key={Subject._id}
                >
                  <h1>{Subject.name}</h1>
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../img/Players/Books.json")}
                    style={{ width: "150px", height: "150px" }}
                  />
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
