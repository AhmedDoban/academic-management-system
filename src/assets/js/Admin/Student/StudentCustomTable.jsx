import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ViewAllStudent,
  DeleteStudent,
} from "../../../redux-toolkit/slices/student-slice";

import Options from "../components/Options";

function StudentCustomTable(props) {
  const AllStudent = useSelector((state) => state.Student);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewAllStudent());
  }, [dispatch, AllStudent]);

  return (
    <React.Fragment>
      <div className="CustomTable">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            { AllStudent.map((p) => (
              <tr key={p.id}>
                <td data-label="id">{p.id}</td>
                <td data-label="Name">{p.firstName + " " + p.lastName}</td>
                <td data-label="Email">{p.email}</td>
                <td data-label="options">
                  <div className="Options">
                    <Options
                      View={`/student/${p.id}`}
                      HandleDelete={() => dispatch(DeleteStudent(p.id))}
                      Edit={`/student/edit/${p.id}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
export default StudentCustomTable;
