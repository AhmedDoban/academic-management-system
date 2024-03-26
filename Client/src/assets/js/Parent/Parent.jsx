import React, { useEffect, lazy, Suspense, useState } from "react";
import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Mountain from "./../components/Mountain Template/Mountain";
import "./parent.css";
import Loading from "../components/Loading/Loading";

// Students page
const Students = lazy(() => import("./Students/Students"));
const Subjects = lazy(() => import("./Students/Subjects/Subjects"));
const SubjectData = lazy(() => import("./Students/Subject Data/SubjectData"));
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
      Root.setProperty("--main-page-color", "#1b575b");
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--black-color", "#000");
      Root.setProperty("--main-p-color", "#777");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--main-page-color", "#121212  ");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--black-color", "#fff");
      Root.setProperty("--main-p-color", "#fff");
    }
  };
  const logOut = () => {
    localStorage.clear();
    Navigate("/");
    window.location.reload(true);
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
                  <NavLink
                    to="/Students"
                    onClick={() => SetLocaltitle("Students")}
                    end
                  >
                    <i className="fa-solid fa-users"></i>
                    <span>Students</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={logOut} to="/">
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
            <Route exact path="/Students" element={<Outlet />}>
              <Route path="" element={<Students />} />
              <Route path=":student_id" element={<Outlet />}>
                <Route path="" element={<Subjects />} />
                <Route path=":generation_id" element={<Outlet />}>
                  <Route path="" element={<SubjectData />} />
                  <Route path=":subject_id" element={<SubjectExams />} />
                </Route>
              </Route>
            </Route>
            <Route exact path="/home" element={<Outlet />}>
              <Route path="" element={<Students />} />
              <Route path=":student_id" element={<Outlet />}>
                <Route path="" element={<Subjects />} />
                <Route path=":generation_id" element={<Outlet />}>
                  <Route path="" element={<SubjectData />} />
                  <Route path=":subject_id" element={<SubjectExams />} />
                </Route>
              </Route>
            </Route>

            {/********** Students Page ***********/}
            <Route exact path="/" element={<Outlet />}>
              <Route path="" element={<Students />} />
              <Route path=":student_id" element={<Outlet />}>
                <Route path="" element={<Subjects />} />
                <Route path=":generation_id" element={<Outlet />}>
                  <Route path="" element={<SubjectData />} />
                  <Route path=":subject_id" element={<SubjectExams />} />
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
