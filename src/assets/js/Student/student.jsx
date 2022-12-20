import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Head from "../Header/Head";
import Share from "./Share";
import Post from "./Post";
import { Posts } from "../../../dummyData";
import { Route, Routes } from "react-router-dom";
import StudentHomePage from "./StudentHomePage";
import StudentSettingPage from "./StudentSettingPage";
import NotFounded from "./../components/NotFounded";
import StudentProfile from "./StudentProfile";
import StudentCourses from "./StudentCourses";
import StudentProjectsPage from "./StudentProjectsPage";
import StudentFriends from "./StudentFriends";
import StudentFilesPage from "./StudentFilesPage";
import StudentTablePage from "./StudentTablePage";

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
              <Routes>
                <Route exact path="/home" element={<StudentHomePage />} />
                <Route path="/setting" element={<StudentSettingPage />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/projects" element={<StudentProjectsPage />} />
                <Route path="/courses" element={<StudentCourses />} />
                <Route path="/Friends" element={<StudentFriends />} />
                <Route path="/Files" element={<StudentFilesPage />} />
                <Route path="/table" element={<StudentTablePage />} />
                <Route exact path="/" element={<StudentHomePage />} />
                <Route path="*" element={<NotFounded to="/NotFounded" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Student;
