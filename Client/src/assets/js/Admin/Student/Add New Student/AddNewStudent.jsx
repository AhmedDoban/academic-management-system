import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mountain from "../../../components/Mountain Template/Mountain";
import "./AddNewStudent.css";

function AddNewStudent() {
  let Navigate = useNavigate();

  const [Data, SetData] = useState({
    student_name: "",
    student_nat_id: "",
    parent_nat_id: "",
  });

  const AddStudent = () => {
    Navigate(-1);
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Add Student</h1>
        </div>
      </Mountain>
      <div className="add-new-student">
        <div className="container">
          <div className="card">
            <input
              type="search"
              id="student_name"
              value={Data.student_name}
              onChange={(e) =>
                SetData({ ...Data, student_name: e.target.value })
              }
              placeholder=" "
            />
            <label htmlFor="student_name">Student Name</label>
          </div>
          <div className="card">
            <input
              type="search"
              id="student_nat_id"
              value={Data.student_nat_id}
              onChange={(e) =>
                SetData({ ...Data, student_nat_id: e.target.value })
              }
              placeholder=" "
            />
            <label htmlFor="student_nat_id">Student Nat ID</label>
          </div>
          <div className="card">
            <input
              type="search"
              id="parent_nat_id"
              value={Data.parent_nat_id}
              onChange={(e) =>
                SetData({ ...Data, parent_nat_id: e.target.value })
              }
              placeholder=" "
            />
            <label htmlFor="parent_nat_id">Parent Nat Id</label>
          </div>
          <div className="card">
            <button onClick={() => AddStudent()}> Add</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AddNewStudent;
