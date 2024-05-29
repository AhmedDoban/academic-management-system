import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StudentDeatils.css";
import Mountain from "./../../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleStudent,
  StudentAdminChandeAvatar,
  StudentAdminRemoveAvatar,
} from "../../../../Toolkit/Slices/AdminSlice";
import Toast_Handelar from "../../../components/Toast_Handelar";
import Swal from "sweetalert2";

function StudentDeatils() {
  const params = useParams();
  const Dispatch = useDispatch();
  const { SingleStudent } = useSelector((state) => state.Admin);
  const [Image, SetImage] = useState(null);

  useEffect(() => {
    Dispatch(GetSingleStudent(params.id));
    //eslint-disable-next-line
  }, []);

  const HandleCHangeImage = (file) => {
    const NewFile = file.target.files[0];
    if (NewFile.type.split("/")[0] === "image") {
      if ((NewFile.size / 1000).toFixed(0) >= 1028) {
        Toast_Handelar("error", "File size cannot exceed more than 1MB");
      } else {
        SetImage(URL.createObjectURL(NewFile));
        Dispatch(
          StudentAdminChandeAvatar({
            _id: SingleStudent._id,
            File: NewFile,
            Token: SingleStudent.Token,
          })
        );
      }
    } else {
      Toast_Handelar("error", "File Must be an image !");
    }
  };

  const HandleRemoveImage = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You want to Delete this Avatar !",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        Dispatch(
          StudentAdminRemoveAvatar({
            _id: SingleStudent._id,
            Token: SingleStudent.Token,
          })
        );
      }
    });
  };

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
                <input
                  type="file"
                  id="UserAvatar"
                  hidden
                  onChange={(file) => HandleCHangeImage(file)}
                />
                <img
                  src={Image ? Image : SingleStudent.Avatar}
                  alt={SingleStudent.name}
                />
              </label>
              <div className="actions">
                <button onClick={() => HandleRemoveImage()}>
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
