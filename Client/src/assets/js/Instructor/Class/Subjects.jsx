import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";
import "./Class.css";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import { useDispatch, useSelector } from "react-redux";
import { GetAllInstructorSubjects } from "../../../Toolkit/Slices/SemestersSlice";
function Subjects() {
  const { loading, Subjects } = useSelector((State) => State.Semester);
  const [TextFeild, SetTextField] = useState("");
  const Dispatcth = useDispatch();

  useEffect(() => {
    Dispatcth(GetAllInstructorSubjects());
  }, []);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> Subjects </h1>
          <div className="card">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src={require("../../../img/Players/Search.json")}
              style={{ width: "50px", height: "50px" }}
            />
            <input
              type="text"
              placeholder="Search . . . "
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
            />
          </div>
        </div>
      </Mountain>
      <div className="subjects">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container" data-aos="fade-">
            {Subjects.filter((p) =>
              TextFeild.toLowerCase() !== ""
                ? p.name.toLowerCase().includes(TextFeild)
                : p.name
            ).map((Subject) => (
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
                  src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                  style={{ width: "100px", height: "150px" }}
                ></Player>
              </Link>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Subjects;
