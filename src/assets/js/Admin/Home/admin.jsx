import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "../style/admin.css";
import AdminHome from "./AdminHome";
import Weather from "../components/Weather/Weather";
const StudentControl = lazy(() => import("./../Student/StudentControl"));
const TeacherControl = lazy(() => import("./../Teacher/TeacherControl"));
const CoursesControl = lazy(() => import("./../Courses/CoursesControl"));
const AddNewStudent = lazy(() => import("../Student/AddNewStudent"));
const StudentDeatils = lazy(() => import("./../Student/StudentDeatils"));
const TeacherDetails = lazy(() => import("../Teacher/TeacherDetails"));

const NotFounded = lazy(() =>
  import("./../../components/Not Founded/NotFounded")
);
function Admin(props) {
  return (
    <React.Fragment>
      <div className="Admin">
        <Weather />
        <div className="Admin-pages-container">
          <Suspense
            fallback={
              <div className="pre-loader">
                <img src={require("../../../img/book.png")} alt="" />
                <div className="dots-loader">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p>academic management system</p>
              </div>
            }
          >
            <Routes>
              <Route path="student" element={<Outlet />}>
                <Route path="" element={<StudentControl />} />
                <Route path=":id" element={<StudentDeatils />} />
                <Route path="addNewStudent" element={<AddNewStudent />} />
              </Route>

              <Route path="teacher" element={<Outlet />}>
                <Route path="" element={<TeacherControl />} />
                <Route path=":id" element={<TeacherDetails />} />
              </Route>
              <Route path="Classes" element={<Outlet />}>
                <Route path="" element={<CoursesControl />} />
              </Route>
              <Route path="/home" element={<AdminHome />} />
              <Route path="/" element={<AdminHome />} />
              <Route path="*" element={<NotFounded to="/NotFounded" />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Admin;
