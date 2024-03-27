import React, { useEffect, useState } from "react";
import "./Semester.css";
import LodingFeachData from "./../../../components/Loding Feach Data/LodingFeachData";
import { useDispatch, useSelector } from "react-redux";
import Dots from "../../../components/Dots/Dots";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { GetStudentSemesters } from "./../../../../Toolkit/Slices/SemestersSlice";

function Semester() {
  const { Semesters, loading } = useSelector((state) => state.Semester);
  const [Search, setSearch] = useState("");
  const [show, setShow] = useState("grid");

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetStudentSemesters());
  }, []);

  /**************** End *******************************************************/

  return (
    <React.Fragment>
      {loading ? (
        <LodingFeachData />
      ) : (
        <div className="Semester" id="Subjects">
          <Dots OtherStyle="top" />
          <Dots OtherStyle="bottom" />
          <div className="container" data-aos="fade-down">
            {/************************** Start input and some options ****************************/}
            <div className="header">
              <div className="input-absulote">
                <input
                  type="text"
                  className="width-full"
                  placeholder="Search for Class Name"
                  value={Search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <i
                className={
                  show === "grid"
                    ? "fa-solid fa-border-all style active"
                    : "fa-solid fa-border-all style"
                }
                onClick={() => setShow("grid")}
              />
              <i
                className={
                  show === "list"
                    ? "fa-solid fa-grip-lines style active"
                    : "fa-solid fa-grip-lines style"
                }
                onClick={() => setShow("list")}
              />
            </div>
            {/**************** End *******************************/}

            {Semesters.length > 0 ? (
              <React.Fragment>
                {/**************** Show data from state *******************************/}
                <div className={`SemesterContainer ${show}`}>
                  {Semesters.filter((items) => {
                    return Search.toLowerCase() === ""
                      ? items
                      : items.name.toLowerCase().includes(Search);
                  }).map((Semester) => (
                    <Link
                      className="card"
                      key={Semester._id}
                      to={`/Semester Subjects/${Semester._id}`}
                    >
                      <div className="info">
                        <Player
                          autoplay={true}
                          loop={true}
                          controls={false}
                          src={require("../../../../img/Players/Books.json")}
                          className="PLayer"
                        />

                        <p>{Semester.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/**************** End *******************************/}
              </React.Fragment>
            ) : (
              <>
                <div className="NoSemesterInserted">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require("../../../../img/Players/NoSemester.json")}
                    className="Player"
                  />
                  <h5>
                    There is no Semestrds go to join semester page and add new
                    subject to semester
                  </h5>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Semester;
