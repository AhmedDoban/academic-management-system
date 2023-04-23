import React, {
  useEffect,
  lazy,
  Suspense,
  useState,
  useRef,
  useCallback,
} from "react";

import {
  Route,
  Routes,
  Navigate,
  NavLink,
  Outlet,
  useParams,
} from "react-router-dom";

import SideBar from "../components/SideBar/SideBar";

// home page
const HomePage = lazy(() => import("../components/Home Page/HomePage"));

// Class Room page
const Class = lazy(() => import("./Class/Class"));
const JoinRoom = lazy(() => import("../components/video call/VideoCall"));
const SubjectData = lazy(() => import("./Class/SubjectData"));
const Subjects = lazy(() => import("./Class/Subjects"));
const Exams = lazy(() => import("./Class/Exams/Exams"));

// library page
const Library = lazy(() => import("../components/Library/Library"));
const BookDetails = lazy(() => import("../components/Library/BookDetails"));

// setting page
const SettingPage = lazy(() => import("./Setting/SettingPage"));

// notfound page
const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));

const Instructor = (props) => {
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
            <NavLink to="subjects" onClick={open}>
              <i className="fa-solid fa-flask"></i>
              <span>subjects</span>
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
                  {/********** Class Page ***********/}
                  <Route path="/Class Room" element={<Outlet />}>
                    <Route path="" element={<Class />} />
                  </Route>
                  {/********** subjects Page ***********/}
                  <Route path="/subjects" element={<Outlet />}>
                    <Route path="" element={<Subjects />} />
                    <Route path=":SubjectID/:SubjectName?" element={<Outlet />}>
                      <Route path="" element={<SubjectData />} />
                      <Route path="Exams" element={<Exams />} />
                      {/********** Call Page ***********/}
                      <Route path="video call/:id" element={<JoinRoom />} />
                    </Route>
                  </Route>
                  {/********** Library Page ***********/}
                  <Route path="/library" element={<Library />}>
                    <Route path=":id" element={<BookDetails />} />
                  </Route>

                  {/********** setting Page ***********/}
                  <Route path="setting" element={<SettingPage />}>
                    <Route path="" exact />
                    <Route path="setting-password" />
                    <Route path="setting-email" />
                    <Route path="*" render={() => <Navigate to="/" />} />
                  </Route>
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

export default Instructor;
