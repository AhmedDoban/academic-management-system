import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./Admin.css";
import Home from "./Home/Home";
import Loading from "../components/Loading/Loading";

// Students
const Students = lazy(() => import("./Student/Students"));
const AddNewStudent = lazy(() =>
  import("./Student/Add New Student/AddNewStudent")
);
const StudentDeatils = lazy(() =>
  import("./Student/Student Details/StudentDeatils")
);
// Instructors
const Instructor = lazy(() => import("./Instructor/Instructor"));
const InstructorDeatils = lazy(() =>
  import("./Instructor/Instructor Details/InstructorDeatils")
);
const AddNewInstructor = lazy(() =>
  import("./Instructor/Add New Instructor/AddNewInstructor")
);

const NotFounded = lazy(() => import("../components/Not Founded/NotFounded"));
function Admin() {
  return (
    <React.Fragment>
      <div className="Admin">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="Students" element={<Outlet />}>
              <Route path="" element={<Students />} />
              <Route path=":id" element={<StudentDeatils />} />
              <Route path="addNewStudent" element={<AddNewStudent />} />
            </Route>

            <Route path="Instructors" element={<Outlet />}>
              <Route path="" element={<Instructor />} />
              <Route path=":id" element={<InstructorDeatils />} />
              <Route path="AddNewInstructor" element={<AddNewInstructor />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFounded to="/NotFounded" />} />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
}

export default Admin;
