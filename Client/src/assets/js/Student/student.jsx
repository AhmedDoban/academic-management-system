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

// Class Room page
const StudenClasses = lazy(() => import("./Classes/StudenClasses"));
const Quiz = lazy(() => import("./Quiz/Quiz"));
const SubjectData = lazy(() => import("./Classes/SubjectData/SubjectData"));
const Exam = lazy(() => import("./Classes/Exams/Exam"));
const ExamPage = lazy(() => import("./Classes/Exams/ExamPage"));
const Viedos = lazy(() => import("../components/videos/Videos"));
const Summary = lazy(() => import("./Classes/Summary/Summary"));
const JoinRoom = lazy(() => import("../components/video call/VideoCall"));
const SubjectNotification = lazy(() =>
  import("./Classes/SubjectNotification/SubjectNotification")
);
const Inquiries = lazy(() => import("./Classes/Inquiries/Inquiries"));
const Chat = lazy(() => import("./Classes/Chat/Chat"));
const ChatBot = lazy(() => import("./Classes/Chat Bot/ChatBot"));
// table page
const StudentTablePage = lazy(() => import("./Table/StudentTablePage"));

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
const NoteDetails = lazy(() => import("./Notes/NoteDetails"));

// setting page
const SettingPage = lazy(() => import("./Setting/SettingPage"));

// Student Call page
const Call = lazy(() => import("../components/Call Room/CallRoom"));

// notfound page
const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));

const Student = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const sidebar = useRef(null);
  const [active, setActive] = useState("fa-solid fa-bars");
  const open = useCallback(
    (e) => {
      e.stopPropagation();
      sidebar.current.classList.toggle("open");
      sidebar.current.classList.contains("open")
        ? setActive("fa-solid fa-xmark")
        : setActive("fa-solid fa-bars");
    },
    [sidebar]
  );
  return (
    <React.Fragment>
      <div className="page p-relative">
        <SideBar SetLogedOn={props.SetLogedOn}>
          <li>
            <NavLink to="table" onClick={open}>
              <i className="fa-solid fa-calendar-days"></i>
              <span>Table</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="Call" onClick={open}>
              <i className="fa-solid fa-phone"></i>
              <span>Call</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="actvity-room" onClick={open}>
              <i className="fa-solid fa-broom"></i>
              <span>Activity Room</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="todo" onClick={open}>
              <i className="fa-solid fa-check"></i>
              <span>Todo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="notes" onClick={open}>
              <i className="fa-solid fa-note-sticky"></i>
              <span>Notes</span>
            </NavLink>
          </li>
        </SideBar>
        <div className="content">
          <div className="pagewrapper display-flex gap-10">
            <div className="width-full">
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
                  {/********** Courses Page ***********/}
                  <Route path="/Class Room" element={<StudenClasses />}>
                    <Route path="" exact />
                    <Route path=":generation_id" element={<StudenClasses />} />
                  </Route>
                  <Route
                    path="/Subject Data/:subject_id/:SubjectName?"
                    element={<Outlet />}
                  >
                    <Route path="" element={<SubjectData />} />
                    <Route path="video call/:id" element={<JoinRoom />} />
                    <Route path="Exam/:id" element={<Outlet />}>
                      <Route path="" element={<Exam />} />
                      <Route path=":Exam_id" element={<ExamPage />} />
                    </Route>
                    <Route
                      path="Videos/:id"
                      element={
                        <Viedos
                          url={`${process.env.REACT_APP_API}/select_videos.php`}
                        />
                      }
                    />
                    <Route path="Summary/:id" element={<Summary />} />
                    <Route
                      path="Notifications/:id"
                      element={<SubjectNotification />}
                    />
                    <Route path="Inquiries/:id" element={<Inquiries />} />
                    <Route path="Chat/:id" element={<Chat />} />
                    <Route path="ChatBot" element={<ChatBot />} />
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
                  <Route path="setting" element={<SettingPage />}>
                    <Route path="" exact />
                    <Route path="setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
                  {/********** Friends Page ***********/}
                  <Route path="/Call" element={<Call />} />

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