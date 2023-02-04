import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "../style/admin.css";

const SideBarAdminPage = lazy(() => import("../components/SideBarAdminPage"));
const StudentControl = lazy(() => import("./../Student/StudentControl"));
const TeacherControl = lazy(() => import("./../Teacher/TeacherControl"));
const CoursesControl = lazy(() => import("./../Courses/CoursesControl"));
const NotFounded = lazy(() => import("./../../components/NotFounded"));
const AddNewStudent = lazy(() => import("../Student/AddNewStudent"));
const StudentDeatils = lazy(() => import("./../Student/StudentDeatils"));
const TeacherDetails = lazy(() => import("../Teacher/TeacherDetails"));
const UpDataStudentInfo = lazy(() => import("./../Student/UpDataStudentInfo"));

function Admin(props) {
  return (
    <React.Fragment>
      <div className="Admin">
        <SideBarAdminPage />
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
              <Route path="/student" element={<StudentControl />} />
              <Route path="/student/:id" element={<StudentDeatils />} />
              <Route path="/edit/:id" element={<UpDataStudentInfo />} />
              <Route
                path="/student/addNewStudent"
                element={<AddNewStudent />}
              />
              <Route path="/teachers" element={<TeacherControl />} />
              <Route path="/teachers/:id" element={<TeacherDetails />} />
              <Route path="/courses" element={<CoursesControl />} />
              <Route path="/" element={<StudentControl />} />
              <Route path="*" element={<NotFounded to="/NotFounded" />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Admin;
