import React, { useEffect, useState } from "react";
import Mountain from "../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import {
  AddStudentSemester,
  GetSubjects,
  SeeNext,
  SeePrev,
} from "../../../Toolkit/Slices/NewSemesterSlice";
import "./JoinSemester.css";
import Swal from "sweetalert2";
import Toast_Handelar from "../../components/Toast_Handelar";
import { useNavigate } from "react-router-dom";
import { UserInSemester } from "../../../Toolkit/Slices/UserSlice";

function JoinSemester() {
  const Dispatch = useDispatch();
  const { Subjects, currentPage, number_of_pages } = useSelector(
    (State) => State.NewSemester
  );
  const Navigate = useNavigate();

  const [SelectedSubjects, SetSelectedSubjects] = useState([]);
  const [CreaditHours, SetCreaditHours] = useState(0);

  // Remove from or Add to selected Subjects
  const HandeleSelectedSubjectd = (e, Subject) => {
    // clone
    const Data = [...SelectedSubjects];
    // Remove from Array
    if (!e.target.checked) {
      // Edit
      const IndexOf = Data.indexOf(Subject._id);
      SetCreaditHours(CreaditHours - Subject.credit_hours);
      Data.splice(IndexOf, 1);
      SetSelectedSubjects(Data);
      return;
    }
    // Add to subjects
    else {
      // Edit
      Data.push(Subject._id);
      SetCreaditHours(CreaditHours + Subject.credit_hours);
      SetSelectedSubjects(Data);
      return;
    }
  };

  useEffect(() => {
    Dispatch(GetSubjects());
  }, []);

  const HandleNext = () => {
    Dispatch(SeeNext());
    Dispatch(GetSubjects());
  };
  const HandlePrev = () => {
    Dispatch(SeePrev());
    Dispatch(GetSubjects());
  };

  const AddStudentNewSemester = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: `You can't back to this page again until finish the selected Subjects`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `<i class="fa-solid fa-check"></i>`,
      cancelButtonText: `<i class="fa-solid fa-xmark"></i>`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (SelectedSubjects.length <= 1) {
          Toast_Handelar("error", "you haven't selected any subject yet !");
          return;
        } else {
          Dispatch(
            AddStudentSemester({
              Subjects: SelectedSubjects,
              Semester_Hours: CreaditHours,
            })
          ).then((res) => {
            if (res.payload.Status === "Faild") {
              Swal.fire(res.payload.Status, res.payload.message, "error");
            } else {
              Swal.fire(res.payload.Status, res.payload.message, "success");
              Dispatch(UserInSemester(true));
              Navigate("/table");
            }
          });
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Semster Subjects</h1>
        </div>
      </Mountain>
      <div className="JoinSemester">
        <div className="container">
          <div className="actions">
            <div className="left">
              <h1 className="main-title">
                Hours Registerd <span>{CreaditHours}</span>
              </h1>
              <p>
                note max hours you can register in each semester is 18 hours
              </p>
            </div>

            <div className="right">
              <button
                onClick={HandlePrev}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "active" : ""}
              >
                Previous
              </button>
              <button
                onClick={HandleNext}
                disabled={currentPage === number_of_pages}
                className={currentPage === number_of_pages ? "active" : ""}
              >
                Next
              </button>
            </div>
          </div>
          <div className="StudentSemsterTablePage">
            <table className="SemsterTable" data-aos="fade-down">
              <thead>
                <tr>
                  <th>#</th>
                  <th colSpan={2}>Subject Name </th>
                  <th>Time</th>
                  <th>Day</th>
                  <th>Credit Hours</th>
                  <th colSpan={3}>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {Subjects.map((subject, index) => (
                  <tr
                    className={
                      SelectedSubjects.includes(subject._id)
                        ? "active"
                        : CreaditHours >= 18
                        ? "disactive"
                        : ""
                    }
                  >
                    <td>
                      <label htmlFor={subject._id} key={subject._id}></label>
                      <input
                        type="checkbox"
                        value={subject._id}
                        name={subject._id}
                        id={subject._id}
                        onChange={(e) => HandeleSelectedSubjectd(e, subject)}
                        disabled={
                          !SelectedSubjects.includes(subject._id) &&
                          CreaditHours >= 18
                            ? true
                            : false
                        }
                        checked={SelectedSubjects.includes(subject._id)}
                        hidden
                      />
                      {index + 1}
                    </td>
                    <td data-label="Subject Name" colSpan={2}>
                      {subject.name}
                    </td>
                    <td data-label="Time">{subject.time}</td>
                    <td data-label="Day">{subject.day}</td>
                    <td data-label="Credit Hours">{subject.credit_hours}</td>
                    <td data-label="Instructor" colSpan={2}>
                      {subject.Instructor.name}
                    </td>
                    <td data-label="Instractpr Image">
                      <img
                        src={subject.Instructor.Avatar}
                        alt={subject.Instructor.name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="register-semester">
            <button onClick={() => AddStudentNewSemester()}>
              Register Semester
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default JoinSemester;
