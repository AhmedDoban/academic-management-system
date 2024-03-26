import React, { useEffect, useState } from "react";
import Mountain from "../../components/Mountain Template/Mountain";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubjects,
  SeeNext,
  SeePrev,
} from "../../../Toolkit/Slices/NewSemesterSlice";
import "./JoinSemester.css";

function JoinSemester() {
  const Dispatch = useDispatch();
  const { Subjects, currentPage, number_of_pages } = useSelector(
    (State) => State.NewSemester
  );

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
                  <th colSpan={3}>Instractor</th>
                </tr>
              </thead>
              <tbody>
                {Subjects.map((subject, index) => (
                  <tr
                    className={
                      SelectedSubjects.includes(subject._id) ? "active" : ""
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
                    <td data-label="Instractor" colSpan={2}>
                      {subject.Instractor.name}
                    </td>
                    <td data-label="Instractpr Image">
                      <img
                        src={subject.Instractor.Avatar}
                        alt={subject.Instractor.name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default JoinSemester;
