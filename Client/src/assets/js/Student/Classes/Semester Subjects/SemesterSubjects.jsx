import React, { useEffect, useState } from "react";
import "./SemesterSubjects.css";
import Dots from "../../../components/Dots/Dots";
import { Link, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";
import { GetStudentSemestersSubjects } from "../../../../Toolkit/Slices/SemestersSlice";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";

function SemesterSubjects() {
  const params = useParams();

  const { Subjects, loading } = useSelector((state) => state.Semester);
  const [show, setShow] = useState("grid");
  const [Search, setSearch] = useState("");

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetStudentSemestersSubjects({ Semester_id: params.Semester_id }));
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <LodingFeachData />
      ) : (
        <div className="SemesterSubjects" id="Subjects">
          <Dots OtherStyle="top" />
          <Dots OtherStyle="bottom" />
          <div className="container">
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

            {Subjects.length > 0 ? (
              <React.Fragment>
                {/**************** Show data from state *******************************/}
                <div className={`SemesterSubjectsContainer ${show}`}>
                  {Subjects.filter((items) => {
                    return Search.toLowerCase() === ""
                      ? items
                      : items.name.toLowerCase().includes(Search);
                  }).map((Semester) => (
                    <Link
                      className="card"
                      data-aos="zoom-in"
                      key={Semester._id}
                      to={
                        Semester.IsPassed || Semester.IsPassed === false
                          ? ""
                          : `/Subject Data/${Semester._id}/${Semester.name}`
                      }
                    >
                      <div className="info">
                        {Semester.IsPassed ? (
                          <img
                            src={require("../../../../img/success.png")}
                            alt="success"
                            className="PLayer"
                          />
                        ) : Semester.IsPassed === false ? (
                          <img
                            src={require("../../../../img/Faild.png")}
                            alt="success"
                            className="PLayer"
                          />
                        ) : (
                          <Player
                            autoplay={true}
                            loop={true}
                            controls={false}
                            src={require("../../../../img/Players/SubjectBook.json")}
                            className="PLayer"
                          />
                        )}

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
                  <h5>There is no Subjects Ask admin to solve this problem</h5>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default SemesterSubjects;
