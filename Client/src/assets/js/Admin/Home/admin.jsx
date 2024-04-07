import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "../style/admin.css";
import AdminHome from "./AdminHome";
import Loading from "../../components/Loading/Loading";
import Mountain from "../../components/Mountain Template/Mountain";

// Students
const StudentControl = lazy(() => import("./../Student/StudentControl"));
const AddNewStudent = lazy(() => import("../Student/AddNewStudent"));
const StudentDeatils = lazy(() => import("./../Student/StudentDeatils"));
// Instructors
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
        <Mountain>
          <div className="data">
            <h1>Admin</h1>
          </div>
        </Mountain>
        <div className="container">
          <div className="Admin-pages-container">
            <Suspense fallback={<Loading />}>
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
