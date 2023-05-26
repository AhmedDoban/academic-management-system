import React, {
  useEffect,
  lazy,
  Suspense,
  useState,
  useRef,
  useCallback,
} from "react";

import { Route, Routes, Navigate, NavLink, Outlet } from "react-router-dom";

import SideBar from "../components/SideBar/SideBar";
import InquiriesCenter from "./Class/Inquiries Center/InquiriesCenter";

// home page
const HomePage = lazy(() => import("../components/Home Page/HomePage"));

// Class Room page
const Class = lazy(() => import("./Class/Class"));
const JoinRoom = lazy(() => import("../components/video call/VideoCall"));
const SubjectData = lazy(() => import("./Class/SubjectData/SubjectData"));
const Subjects = lazy(() => import("./Class/Subjects"));
const Exams = lazy(() => import("./Class/Exams/Exams"));
const NewExam = lazy(() => import("./Class/Exams/NewExam"));
const EditExam = lazy(() => import("./Class/Exams/EditExam"));
const EditSelectedExam = lazy(() =>
  import("./Class/Exams/EditExam/EditSelectedExam")
);
const AddNewQu = lazy(() => import("./Class/Exams/EditExam/AddNewQu"));
const Viedos = lazy(() => import("../components/videos/Videos"));
const VideoCenter = lazy(() => import("./Class/Video Center/VideoCenter"));
const SammaryCenter = lazy(() =>
  import("./Class/Sammary Center/SammaryCenter")
);

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
                    <Route
                      path=":subject_id/:SubjectName?"
                      element={<Outlet />}
                    >
                      <Route path="" element={<SubjectData />} />
                      <Route
                        path="Exams/:subject_id/:SubjectName?"
                        element={<Outlet />}
                      >
                        <Route path="" element={<Exams />} />
                        <Route path="CreateExam" element={<NewExam />} />
                        <Route
                          path="EditExam/:exam_id/:examName?/:handleotherdata?"
                          element={<Outlet />}
                        >
                          <Route path="" element={<EditExam />} />
                          <Route path="addQu" element={<AddNewQu />} />
                          <Route
                            path="EditExam/:exam_id"
                            element={<EditSelectedExam />}
                          />
                        </Route>
                      </Route>
                      {/********** Video Center Page ***********/}
                      <Route
                        path="VideoCenter/:subject_id/:SubjectName?"
                        element={<VideoCenter />}
                      >
                        <Route path="" exact />
                        <Route path="DeleteVideo" />
                        <Route path="EditVideo" />
                        <Route path="showVideo" />
                        <Route path="*" render={() => <Navigate to="/" />} />
                      </Route>
                      {/********** Sammary Center Page ***********/}
                      <Route
                        path="SammaryCenter/:subject_id/:SubjectName?"
                        element={<SammaryCenter />}
                      >
                        <Route path="" exact />
                        <Route path="DeleteSammary" />
                        <Route path="UploadSammary" />
                        <Route path="*" render={() => <Navigate to="/" />} />
                      </Route>
                      {/********** Videos Page ***********/}
                      <Route
                        path="Videos/:id"
                        element={
                          <Viedos
                            url={`${process.env.REACT_APP_API}/doctor/select_videos.php`}
                          />
                        }
                      />
                      {/********** Call Page ***********/}
                      <Route path="video call/:id" element={<JoinRoom />} />

                      {/********** Inquiries Center Page ***********/}
                      <Route
                        path="InquiriesCenter/:subject_id/:SubjectName?"
                        element={<InquiriesCenter />}
                      >
                        <Route path="" exact />
                        <Route path="DeleteInquiries" />
                        <Route path="AnswerInquiries" />
                        <Route path="*" render={() => <Navigate to="/" />} />
                      </Route>
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
