import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "../style/admin.css";
import AdminHome from "./AdminHome";

const SideBarAdminPage = lazy(() => import("../components/SideBarAdminPage"));
const StudentControl = lazy(() => import("./../Student/StudentControl"));
const TeacherControl = lazy(() => import("./../Teacher/TeacherControl"));
const CoursesControl = lazy(() => import("./../Courses/CoursesControl"));
const AddNewStudent = lazy(() => import("../Student/AddNewStudent"));
const StudentDeatils = lazy(() => import("./../Student/StudentDeatils"));
const TeacherDetails = lazy(() => import("../Teacher/TeacherDetails"));
const UpDataStudentInfo = lazy(() => import("./../Student/UpDataStudentInfo"));
const NotFounded = lazy(() =>
  import("./../../components/Not Founded/NotFounded")
);
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
              <Route path="student" element={<Outlet />}>
                <Route path="" element={<StudentControl />} />
                <Route path=":id" element={<StudentDeatils />} />
                <Route path="addNewStudent" element={<AddNewStudent />} />
                <Route path="edit/:id" element={<UpDataStudentInfo />} />
              </Route>

              <Route path="teachers" element={<Outlet />}>
                <Route path="" element={<TeacherControl />} />
                <Route path=":id" element={<TeacherDetails />} />
              </Route>
              <Route path="courses" element={<Outlet />}>
                <Route path="" element={<CoursesControl />} />
              </Route>
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
