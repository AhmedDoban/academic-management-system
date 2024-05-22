import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewInstructor.css";
import Mountain from "../../../components/Mountain Template/Mountain";

function AddNewInstructor() {
  let Navigate = useNavigate();

  const [Data, SetData] = useState({
    Instructor_name: "",
    Instructor_nat_id: "",
    parent_nat_id: "",
  });

  const AddInstructor = () => {};

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1>Add Instructor</h1>
        </div>
      </Mountain>
      <div className="add-new-Instructor">
        <div className="container">
          <div className="card">
            <input
              type="search"
              id="Instructor_name"
              value={Data.Instructor_name}
              onChange={(e) =>
                SetData({ ...Data, Instructor_name: e.target.value })
              }
              placeholder=" "
            />
            <label htmlFor="Instructor_name">Instructor Name</label>
          </div>
          <div className="card">
            <input
              type="search"
              id="Instructor_nat_id"
              value={Data.Instructor_nat_id}
              onChange={(e) =>
                SetData({ ...Data, Instructor_nat_id: e.target.value })
              }
              placeholder=" "
            />
            <label htmlFor="Instructor_nat_id">Instructor Nat ID</label>
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
            <button onClick={() => AddInstructor()}> Add</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AddNewInstructor;
