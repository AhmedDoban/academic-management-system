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

// home page
const HomePage = lazy(() => import("../components/Home Page/HomePage"));

// Courses page
const StudentCourses = lazy(() => import("./Courses/StudentCourses"));
const CourseData = lazy(() => import("./Courses/CourseData"));
const Quiz = lazy(() => import("./Quiz/Quiz"));

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
const SettingPage = lazy(() =>
  import("../components/Setting/SettingPage")
);

// Student Call page
const Call = lazy(() => import("../components/Call Room/CallRoom"));
// Student Tasks page
const Tasks = lazy(() => import("./Tasks/Tasks"));

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
        <SideBar>
          <li>
            <NavLink to="courses" onClick={open}>
              <i className="fa-solid fa-graduation-cap fa-fw"></i>
              <span>Class Room</span>
            </NavLink>
          </li>
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
          <li>
            <NavLink to="Tasks" onClick={open}>
              <i className="fa-solid fa-diagram-project fa-fw"></i>
              <span>Tasks</span>
            </NavLink>
          </li>
        </SideBar>
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
                  <Route exact path="/home" element={<HomePage />} />
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
                  <Route
                    path="setting"
                    element={
                      <SettingPage userDetails={props.userDetails} />
                    }
                  >
                    <Route path="" exact />
                    <Route path="setting-password" />
                    <Route path="setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
                  {/********** Friends Page ***********/}
                  <Route path="/Call" element={<Call />} />
                  {/********** projects Page ***********/}
                  <Route path="/Tasks" element={<Tasks />} />
                  {/********** Home Page ***********/}
                  <Route exact path="/" element={<HomePage />} />
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
