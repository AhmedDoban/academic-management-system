import React, { useEffect, lazy, Suspense } from "react";
import SideBar from "../components/SideBar";
import Head from "../Header/Head";
import { Route, Routes, Navigate } from "react-router-dom";
import Quiz from "./Quiz/Quiz";

const StudentSettingPage = lazy(() => import("./Setting/StudentSettingPage"));
const StudentCourses = lazy(() => import("./Courses/StudentCourses"));
const StudentProjectsPage = lazy(() => import("./StudentProjectsPage"));
const StudentFriends = lazy(() => import("./StudentFriends"));
const StudentFilesPage = lazy(() => import("./StudentFilesPage"));
const StudentTablePage = lazy(() => import("./StudentTablePage"));
const Library = lazy(() => import("./library/library"));
const CourseData = lazy(() => import("./Courses/CourseData"));
const StudentHomePage = lazy(() => import("./Home/StudentHomePage"));
const NotFounded = lazy(() => import("./../components/NotFounded"));

const Student = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <div className="page p-relative">
        <SideBar />
        <div className="content">
          <Head />
          <div className="pagewrapper display-flex gap-10">
            <div className="postContainer width-full">
              <Suspense
                fallback={
                  <div class="pre-loader">
                    <img src={require("../../img/book.png")} alt="" />
                    <div class="dots-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <p>academic management system</p>
                  </div>
                }
              >
                <Routes>
                  <Route exact path="/home" element={<StudentHomePage />} />
                  <Route path="setting" element={<StudentSettingPage />}>
                    <Route path="" exact />
                    <Route path="student-setting-password" />
                    <Route path="student-setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
                  <Route path="/projects" element={<StudentProjectsPage />} />
                  <Route path="/courses" element={<StudentCourses />} />
                  <Route path="/courses/:id" element={<CourseData />} />
                  <Route path="/Friends" element={<StudentFriends />} />
                  <Route path="/Files" element={<StudentFilesPage />} />
                  <Route path="/table" element={<StudentTablePage />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route exact path="/" element={<StudentHomePage />} />
                  <Route path="*" element={<NotFounded to="/NotFounded" />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Student;
