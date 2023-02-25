import React, { useEffect, lazy, Suspense } from "react";
import SideBar from "../components/SideBar";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

// home page
const StudentHomePage = lazy(() => import("./Home/StudentHomePage"));

// Courses page
const StudentCourses = lazy(() => import("./Courses/StudentCourses"));
const CourseData = lazy(() => import("./Courses/CourseData"));
const Quiz = lazy(() => import("./Quiz/Quiz"));

// table page
const StudentTablePage = lazy(() => import("./Table/StudentTablePage"));

// library page
const Library = lazy(() => import("./Library/Library"));
const BookDetails = lazy(() => import("./Library/BookDetails"));

// activity page
const ActivityRoom = lazy(() => import("./ActivityRoom/ActivityRoom"));
const Drawing = lazy(() => import("./ActivityRoom/Drawing/Drawing"));
const MemoryGame = lazy(() => import("./ActivityRoom/MemoryGame/MemoryGame"));

// todo page
const Todo = lazy(() => import("./Todo/StudentTodo"));

// Notes page
const Notes = lazy(() => import("./Notes/Notes"));
const NoteDetails = lazy(() => import("./Notes/NoteDetails"));

// setting page
const StudentSettingPage = lazy(() => import("./Setting/StudentSettingPage"));

// Project page
const StudentProjectsPage = lazy(() => import("./StudentProjectsPage"));

// Student Friends page
const CallFriend = lazy(() => import("./Frinds/CallFriend"));
// Student File page
const StudentFilesPage = lazy(() => import("./StudentFilesPage"));

// notfound page
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
          <div className="pagewrapper display-flex gap-10">
            <div className="width-full">
              <Suspense
                fallback={
                  <div className="pre-loader">
                    <img src={require("../../img/book.png")} alt="" />
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
                  {/********** Home Page ***********/}
                  <Route exact path="/home" element={<StudentHomePage />} />
                  {/********** Courses Page ***********/}
                  <Route path="/courses" element={<Outlet />}>
                    <Route path="" element={<StudentCourses />} />
                    <Route path=":id" element={<Outlet />}>
                      <Route path="" element={<CourseData />} />
                      <Route path="quiz/:courseId" element={<Quiz />} />
                    </Route>
                  </Route>
                  {/********** Table Page ***********/}
                  <Route path="/table" element={<StudentTablePage />} />
                  {/********** Library Page ***********/}
                  <Route path="/library" element={<Library />}>
                    <Route path=":id" element={<BookDetails />} />
                  </Route>
                  {/********** actvity Page ***********/}
                  <Route path="/actvity-room" element={<Outlet />}>
                    <Route path="" element={<ActivityRoom />} />
                    <Route path="drawing" element={<Drawing />} />
                    <Route path="memory-game" element={<MemoryGame />} />
                  </Route>
                  {/********** Todo Page ***********/}
                  <Route path="todo" element={<Todo />} />
                  {/********** Notes Page ***********/}
                  <Route path="notes" element={<Notes />}>
                    <Route path=":noteName" element={<NoteDetails />} />
                  </Route>
                  {/********** setting Page ***********/}
                  <Route path="setting" element={<StudentSettingPage />}>
                    <Route path="" exact />
                    <Route path="student-setting-password" />
                    <Route path="student-setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
                  {/********** projects Page ***********/}
                  <Route path="/projects" element={<StudentProjectsPage />} />
                  {/********** Friends Page ***********/}
                  <Route path="/CallFriends" element={<CallFriend />} />
                  {/********** projects Page ***********/}
                  <Route path="/Files" element={<StudentFilesPage />} />
                  {/********** Home Page ***********/}
                  <Route exact path="/" element={<StudentHomePage />} />
                  {/********** Not Founded Page ***********/}
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
