import React, { useEffect, lazy, Suspense, useState } from "react";
import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Mountain from "./../components/Mountain Template/Mountain";
import "./parent.css";
import Loading from "../components/Loading/Loading";

// Students page
const Students = lazy(() => import("./Students/Students"));
const SingleExam = lazy(() => import("./Students/Single Exam/SingleExam"));
const Exams = lazy(() => import("./Students/Exams/Exams"));
const SubjectExams = lazy(() =>
  import("./Students/Subject Exams/SubjectExams")
);

// notfound page
const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));

function Parent(props) {
  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Chek, SetChek] = useState(false);
  const [Localtitle, SetLocaltitle] = useState("Students");
  const toggleTheme = () => {
    Theme === "light" ? SetTheme("dark") : SetTheme("light");
  };
  const HandleThemeChange = () => {
    SetChek(!Chek);
    toggleTheme();
  };
  useEffect(() => {
    localStorage.setItem("theme", Theme);
    Theme === "light" ? SetChek(false) : SetChek(true);
    CheckCurrentTheme();
  }, [Theme]);

  const CheckCurrentTheme = () => {
    let Root = document.documentElement.style;
    if (Theme === "light") {
      Root.setProperty("--main-background-color", "#f1f5f9");
      Root.setProperty("--footer-background-color", "#f5f9f7");
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--main-white-alt", "#eee");
      Root.setProperty("--main-text-color", "#000");
      Root.setProperty("--main-p-color", "#777");
      Root.setProperty("--main-overlay", "rgba(125, 125, 125, 0.7)");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--footer-background-color", "#111111");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--main-text-color", "#fff");
      Root.setProperty("--main-white-alt", "#303841");
      Root.setProperty("--main-p-color", "#eee");
      Root.setProperty("--main-overlay", "rgba(47, 47, 47, 0.7)");
    }
  };
  const logOut = () => {
    localStorage.clear();
    Navigate("/");
  };
  return (
    <React.Fragment>
      <div className="parent">
        <Mountain>
          <div className="data">
            <h1> {Localtitle} </h1>
            <div className="contentData">
              <label htmlFor="Theme" className="ThemeMountain">
                <input
                  type="checkbox"
                  name="Theme"
                  id="Theme"
                  onChange={HandleThemeChange}
                  checked={Chek}
                />
                <span></span>
              </label>
              <ul>
                <li>
                  <NavLink to="/" onClick={() => SetLocaltitle("Students")}>
                    <i className="fa-solid fa-users"></i>
                    <span>Students</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={logOut} to="/login">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>log-out </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Mountain>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/********** Students Page ***********/}
            <Route exact path="/" element={<Outlet />}>
              <Route path="" element={<Students />} />
              <Route path=":student_id" element={<Outlet />}>
                <Route path="" element={<Exams />} />
                <Route path=":Subject_Id" element={<Outlet />}>
                  <Route path="" element={<SubjectExams />} />
                  <Route path=":Exam_Id" element={<SingleExam />} />
                </Route>
              </Route>
            </Route>

            {/********** Not Founded Page ***********/}
            <Route path="*" element={<NotFounded to="/NotFounded" />} />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}
export default Parent;
