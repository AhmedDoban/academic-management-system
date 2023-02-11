import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomInputField from "./../components/CustomInputField";
import { useDispatch, useSelector } from "react-redux";
import { ViewStudent } from "../../../redux-toolkit/slices/student-slice";

function StudentDeatils(props) {
  const params = useParams([]);
  const Student = useSelector((state) => state.Student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewStudent(params.id));
  }, []);

  return (
    <React.Fragment>
      <div className="StudentDeatils">
        {/********************* Student Details **************************/}
        <h5 className="main-titel-2">Student Details </h5>
        <div className="data">
          <div className="left">
            {Student.profilePicture ? (
              <img src={Student.profilePicture} alt={Student.firstName} />
            ) : (
              <img src={require("../../../img/user.png")} />
            )}
          </div>
          <div className="right">
            <div className="general details">
              <CustomInputField
                data={Student.firstName}
                DataLabel="First Name"
              />
              <CustomInputField data={Student.lastName} DataLabel="last Name" />
              <CustomInputField data={Student.email} DataLabel="Email" />
              <CustomInputField data={Student.password} DataLabel="password" />
              <CustomInputField data={Student.phone} DataLabel="phone" />
              <CustomInputField data={Student.date} DataLabel="date OF Birth" />
              <CustomInputField data={Student.gender} DataLabel="gender" />
            </div>
          </div>
        </div>
        {/*********************End Student Details **************************/}
        {/*********************  More Details **************************/}
        <h5 className="main-titel-2">More Details </h5>
        <div className="data">
          <div className="right">
            <div className="general details">
              <CustomInputField data={Student.country} DataLabel="country" />
              <CustomInputField data={Student.city} DataLabel="City" />
              <CustomInputField data={Student.gpa} DataLabel="gpa" />
            </div>
          </div>
        </div>
        {/********************* End More Details**************************/}
        {/*********************  Parent Details **************************/}
        <h5 className="main-titel-2">Parent Details </h5>
        <div className="data">
          <div className="right">
            <div className="general details">
              <CustomInputField
                data={Student.fatherInfo?.name}
                DataLabel="Parent Name"
              />
              <CustomInputField
                data={Student.fatherInfo?.PhoneNumber}
                DataLabel="Parent P.N"
              />
              <CustomInputField
                data={Student.fatherInfo?.job}
                DataLabel="parent Work"
              />
            </div>
          </div>
        </div>
        {/********************* End Parent Details**************************/}
        {/*********************  Student Courses **************************/}
        <h5 className="main-titel-2">Student Courses</h5>
        <div className="data">
          <div className="right">
            <ol>
              {Student.CoursesID?.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </div>

        {/********************* End Parent Details**************************/}
      </div>
    </React.Fragment>
  );
}
export default StudentDeatils;
