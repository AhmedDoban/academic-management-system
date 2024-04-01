import React, { lazy } from "react";
import { useParams, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./SummaryCenter.css";

const AllSubjectSummary = lazy(() =>
  import("./All Subject Summary/AllSubjectSummary")
);
const DeleteSummary = lazy(() => import("./Delete Summary/DeleteSummary"));
const UploadSummary = lazy(() => import("./Upload Summary/UploadSummary"));

function SummaryCenter() {
  const params = useParams("");

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.SubjectName}</h1>
        </div>
      </Mountain>
      <div className="SummaryCenter">
        <div className="container">
          <div className="menu">
            <ul>
              <li>
                <NavLink to="" end>
                  All
                </NavLink>
              </li>
              <li>
                <NavLink to="DeleteSummary">Delete </NavLink>
              </li>
              <li>
                <NavLink to="UploadSummary">Upload</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="" exact element={<AllSubjectSummary />} />
        <Route path="DeleteSummary" element={<DeleteSummary />} />
        <Route path="UploadSummary" element={<UploadSummary />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
export default SummaryCenter;
