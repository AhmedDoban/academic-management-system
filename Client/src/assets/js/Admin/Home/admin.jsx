import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "../style/admin.css";
import AdminHome from "./AdminHome";
import Weather from "../components/Weather/Weather";

// Students
const StudentControl = lazy(() => import("./../Student/StudentControl"));
const AddNewStudent = lazy(() => import("../Student/AddNewStudent"));
const StudentDeatils = lazy(() => import("./../Student/StudentDeatils"));
// Instractors
const TeacherControl = lazy(() => import("./../Teacher/TeacherControl"));
const TeacherDetails = lazy(() => import("../Teacher/TeacherDetails"));
const AddNewTeacher = lazy(() => import("../Teacher/AddNewTeacher"));
// Classes
const CoursesControl = lazy(() => import("./../Courses/CoursesControl"));
const AddNewCourse = lazy(() => import("../Courses/AddNewCourse"));
const CoursesDetails = lazy(() => import("../Courses/CoursesDetails"));

const NotFounded = lazy(() =>
  import("./../../components/Not Founded/NotFounded")
);
function Admin(props) {
  return (
    <React.Fragment>
      <div className="Admin">
        <Weather />
        <div className="container">
          <div className="Admin-pages-container">
            <Suspense
              fallback={
                <div className="pre-loader">
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
                  <Route path="addNewTeacher" element={<AddNewTeacher />} />
                </Route>
                <Route path="Classes" element={<Outlet />}>
                  <Route path="" element={<CoursesControl />} />
                  <Route path=":id" element={<CoursesDetails />} />
                  <Route path="addNewCourse" element={<AddNewCourse />} />
                </Route>
                <Route path="/home" element={<AdminHome />} />
                <Route path="/" element={<AdminHome />} />
                <Route path="*" element={<NotFounded to="/NotFounded" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Admin;