import React, {
  useEffect,
  lazy,
  Suspense,
  useState,
  useRef,
  useCallback,
} from "react";

import { Route, Routes, Navigate, Outlet, NavLink } from "react-router-dom";

import SideBar from "../components/SideBar/SideBar";
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";

// Semester Subjects page
const ClassRoom = lazy(() => import("./Classes/ClassRoom"));

const SubjectData = lazy(() => import("./Classes/SubjectData/SubjectData"));
const Exam = lazy(() => import("./Classes/Exams/Exam"));
const ExamPage = lazy(() => import("./Classes/Exams/ExamPage"));
const Viedos = lazy(() => import("../components/videos/Videos"));
const Summary = lazy(() => import("./Classes/Summary/Summary"));
const Inquiries = lazy(() => import("./Classes/Inquiries/Inquiries"));
const Chat = lazy(() => import("../components/Chat/Chat"));
const VideoCall = lazy(() => import("../components/Video call/VideoCall"));

// table page
const StudentTablePage = lazy(() => import("./Table/StudentTablePage"));
const JoinSemester = lazy(() => import("./Join Semester/JoinSemester"));

// library page
const Library = lazy(() => import("../components/Library/Library"));
const BookDetails = lazy(() => import("../components/Library/BookDetails"));

// activity page
const ActivityRoom = lazy(() => import("./ActivityRoom/ActivityRoom"));
const Drawing = lazy(() => import("./ActivityRoom/Drawing/Drawing"));
const MemoryGame = lazy(() => import("./ActivityRoom/MemoryGame/MemoryGame"));

// todo page
const Todo = lazy(() => import("./Todo/StudentTodo"));

// Notes page
const Notes = lazy(() => import("./Notes/Notes"));

// setting page
const SettingPage = lazy(() => import("./Setting/SettingPage"));

// notfound page
const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));

const Student = (props) => {
  const { IsInsemester } = useSelector((state) => state.User.user);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  //eslint-disable-next-line

  return (
    <React.Fragment>
      <div className="page p-relative">
        <SideBar>
          <li>
            <NavLink to="/">
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>Class Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={IsInsemester ? "table" : "Join semester"}>
              <i
                className={
                  IsInsemester
                    ? "fa-solid fa-calendar-days"
                    : "fa-solid fa-file-signature"
                }
              ></i>
              <span>{IsInsemester ? "Table" : "Join semester"}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="actvity-room">
              <i className="fa-solid fa-broom"></i>
              <span>Activity Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="todo">
              <i className="fa-solid fa-check"></i>
              <span>Todo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="notes">
              <i className="fa-solid fa-note-sticky"></i>
              <span>Notes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="library">
              <i className="fa-solid fa-book"></i>
              <span>Library</span>
            </NavLink>
          </li>
        </SideBar>
        <div className="content">
          <div className="pagewrapper display-flex gap-10">
            <div className="width-full">
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/********** Courses Page ***********/}
                  <Route path="/Semester Subjects" element={<ClassRoom />}>
                    <Route path="" exact />
                    <Route path=":Semester_id" element={<ClassRoom />} />
                  </Route>
                  <Route path="" element={<ClassRoom />}>
                    <Route path="" exact />
                    <Route
                      path="/Semester Subjects/:Semester_id"
                      element={<ClassRoom />}
                    />
                  </Route>
                  <Route
                    path="/Subject Data/:Subject_id/:SubjectName?"
                    element={<Outlet />}
                  >
                    <Route path="" element={<SubjectData />} />
                    <Route path="Exam" element={<Outlet />}>
                      <Route path="" element={<Exam />} />
                      <Route path=":Exam_id" element={<ExamPage />} />
                    </Route>
                    <Route path="Videos" element={<Viedos />} />
                    <Route path="Summary" element={<Summary />} />
                    <Route path="Inquiries" element={<Inquiries />} />
                    <Route path="Chat" element={<Chat />} />
                    <Route path="Video Call" element={<VideoCall />} />
                  </Route>
                  {/********** Table Page or join semester***********/}
                  <Route
                    path={IsInsemester ? "/table" : "/Join semester"}
                    element={
                      IsInsemester ? <StudentTablePage /> : <JoinSemester />
                    }
                  />
                  <Route
                    path={IsInsemester ? "/table" : "/Join semester"}
                    element={<StudentTablePage />}
                  >
                    <Route path=":Semester_id" />
                  </Route>
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
                  <Route path="notes" element={<Notes />} />

                  {/********** setting Page ***********/}
                  <Route path="setting" element={<SettingPage />}>
                    <Route path="" exact />
                    <Route path="setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
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
