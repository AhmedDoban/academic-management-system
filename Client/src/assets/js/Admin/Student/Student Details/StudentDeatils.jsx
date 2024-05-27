import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StudentDeatils.css";
import Mountain from "./../../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleStudent } from "../../../../Toolkit/Slices/AdminSlice";

function StudentDeatils() {
  const params = useParams();
  const { SingleStudent } = useSelector((state) => state.Admin);

  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetSingleStudent(params.id));
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="StudentDeatils">
        <Mountain>
          <div className="data">
            <h1>Information</h1>
          </div>
        </Mountain>
        <div className="container">
          <div className="Information-Data-box">
            <div className="UserImage">
              <label htmlFor="UserAvatar" className="UserAvatar">
                <input type="file" id="UserAvatar" hidden />
                <img src={SingleStudent.Avatar} alt={SingleStudent.name} />
              </label>
              <div className="actions">
                <button>
                  <span>Remove</span>
                </button>
                <button>
                  <span>Update</span>
                </button>
              </div>
            </div>
            <div className="details">
              <h1 className="itemTitle">{SingleStudent.name}</h1>
              <div className="detailItem">
                <label className="itemKey">Name </label>
                <input
                  type="text"
                  className="itemValue"
                  value={SingleStudent.name}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">National Id </label>
                <input
                  type="text"
                  className="itemValue"
                  value={SingleStudent.national_ID}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">Phone </label>
                <input
                  type="text"
                  className="itemValue"
                  value={SingleStudent.Mobile}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">Location </label>
                <input
                  type="text"
                  className="itemValue"
                  value={SingleStudent.Location}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">Email </label>
                <input
                  type="email"
                  className="itemValue"
                  value={SingleStudent.email}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">Parent Id </label>
                <input
                  type="text"
                  className="itemValue"
                  value={SingleStudent.parent_national_ID}
                />
              </div>
              <div className="detailItem">
                <label className="itemKey">GPA </label>
                <p className="GpaProcess">
                  {SingleStudent?.Gpa?.Hours_X_Creadit /
                    SingleStudent?.Gpa?.All_Semester_Hours}
                </p>
              </div>
              <div className="detailItem">
                <label className="itemKey">In semester </label>
                <div className="inSemester-actions">
                  <div className="inSemester-actions-box">
                    <input
                      type="radio"
                      name="IsInSemester"
                      id="InSemester"
                      checked={SingleStudent.IsInsemester}
                      hidden
                    />
                    <label htmlFor="InSemester">Yes</label>
                  </div>
                  <div className="inSemester-actions-box">
                    <input
                      type="radio"
                      name="IsInSemester"
                      id="NotInSemester"
                      checked={!SingleStudent.IsInsemester}
                      hidden
                    />
                    <label htmlFor="NotInSemester">No</label>
                  </div>
                </div>
              </div>
              <div className="detailItem">
                <button>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentDeatils;
