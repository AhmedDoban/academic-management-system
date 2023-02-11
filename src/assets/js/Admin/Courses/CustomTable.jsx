import React, { useEffect } from "react";
import Options from "../components/Options";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCourse,
  ViewAllCourses,
} from "../../../redux-toolkit/slices/courses-slice";

function CustomTable(props) {
  const AllCourses = useSelector((state) => state.Courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewAllCourses());
  }, [dispatch, AllCourses]);

  return (
    <React.Fragment>
      <div className="CustomTable">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Cource Teacher</th>
              <th>Cource Name</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {AllCourses.map((p) => (
              <tr key={p.id}>
                <td data-label="id">{p.id}</td>
                <td data-label="Cource Teacher">{p.CourcesTeacher}</td>
                <td data-label="Cource Name">{p.CourcesName}</td>
                <td data-label="options">
                  <div className="Options">
                    <Options
                      View={`/courses/${p.id}`}
                      HandleDelete={() => dispatch(DeleteCourse(p.id))}
                      Edit={`/courses/edit/${p.id}`}
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
export default CustomTable;
