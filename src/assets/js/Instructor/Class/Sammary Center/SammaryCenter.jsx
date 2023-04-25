import React, { lazy } from "react";
import { useParams, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./SammaryCenter.css";

const AllSubjectSammary = lazy(() =>
  import("./All Subject Sammary/AllSubjectSammary")
);
const DeleteSammary = lazy(() => import("./Delete Sammary/DeleteSammary"));
const UploadSammary = lazy(() => import("./Upload Sammary/UploadSammary"));

function SammaryCenter() {
  const params = useParams("");

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>{params.SubjectName}</h1>
        </div>
      </Mountain>
      <div className="SammaryCenter">
        <div className="container">
          <div className="menu">
            <ul>
              <li>
                <NavLink to="" end>
                  All
                </NavLink>
              </li>
              <li>
                <NavLink to="DeleteSammary">Delete </NavLink>
              </li>
              <li>
                <NavLink to="UploadSammary">Upload</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="" exact element={<AllSubjectSammary />} />
        <Route path="DeleteSammary" element={<DeleteSammary />} />
        <Route path="UploadSammary" element={<UploadSammary />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
export default SammaryCenter;
