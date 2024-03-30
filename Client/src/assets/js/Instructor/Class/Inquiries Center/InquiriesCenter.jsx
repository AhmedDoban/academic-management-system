import React, { lazy } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./InquiriesCenter.css";

const AllInquiries = lazy(() => import("./All Inquiries.jsx/AllInquiries"));
const DeleteInquiries = lazy(() =>
  import("./Delete Inquiries/DeleteInquiries")
);
const AnswerInquiries = lazy(() =>
  import("./Answer Inquiries/AnswerInquiries")
);

function InquiriesCenter() {
  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Inquiries</h1>
        </div>
      </Mountain>
      <div className="InquiriesCenter">
        <div className="container">
          <div className="menu">
            <ul>
              <li>
                <NavLink to="" end>
                  All
                </NavLink>
              </li>
              <li>
                <NavLink to="DeleteInquiries">Delete </NavLink>
              </li>
              <li>
                <NavLink to="AnswerInquiries">Answer</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="" exact element={<AllInquiries />} />
        <Route path="DeleteInquiries" element={<DeleteInquiries />} />
        <Route path="AnswerInquiries" element={<AnswerInquiries />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}
export default InquiriesCenter;
