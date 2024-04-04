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
import Loading from "../components/Loading/Loading";

// Class Room page
const Class = lazy(() => import("./Class/Class"));
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
const SummaryCenter = lazy(() =>
  import("./Class/Summary Center/SummaryCenter")
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
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/********** Class Page ***********/}
                  <Route path="/" element={<Outlet />}>
                    <Route path="" element={<Class />} />
                  </Route>
                  <Route path="/Class Room" element={<Outlet />}>
                    <Route path="" element={<Class />} />
                  </Route>
                  {/********** subjects Page ***********/}
                  <Route path="/subjects" element={<Outlet />}>
                    <Route path="" element={<Subjects />} />
                    <Route
                      path=":Subject_id/:SubjectName?"
                      element={<Outlet />}
                    >
                      <Route path="" element={<SubjectData />} />
                      <Route path="Exams" element={<Outlet />}>
                        <Route path="" element={<Exams />} />
                        <Route path="CreateExam" element={<NewExam />} />
                        <Route path="EditExam/:Exam_id" element={<Outlet />}>
                          <Route path="" element={<EditExam />} />
                          <Route path="AddQuestion" element={<AddNewQu />} />
                          <Route path="Edit" element={<EditSelectedExam />} />
                        </Route>
                      </Route>
                      {/********** Video Center Page ***********/}
                      <Route path="VideoCenter" element={<VideoCenter />}>
                        <Route path="" exact />
                        <Route path="DeleteVideo" />
                        <Route path="EditVideo" />
                        <Route path="showVideo" />
                        <Route path="*" render={() => <Navigate to="/" />} />
                      </Route>
                      {/********** Summary Center Page ***********/}
                      <Route path="SummaryCenter" element={<SummaryCenter />}>
                        <Route path="" exact />
                        <Route path="DeleteSummary" />
                        <Route path="UploadSummary" />
                        <Route path="*" render={() => <Navigate to="/" />} />
                      </Route>
                      {/********** Videos Page ***********/}
                      <Route path="Videos" element={<Viedos />} />

                      {/********** Inquiries Center Page ***********/}
                      <Route
                        path="InquiriesCenter"
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
