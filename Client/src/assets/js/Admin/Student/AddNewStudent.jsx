import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import axios from "axios";

function AddNewStudent() {
  let Navigate = useNavigate();

  const [Data, SetData] = useState({
    student_name: "",
    student_nat_id: "",
    parent_nat_id: "",
  });

  const HandeADD = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}admin/create_student.php`, Data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message, {
            autoClose: 15000,
            theme: "colored",
          });
          Navigate("/Student");
        } else {
          toast.error(res.data.message, {
            autoClose: 15000,
            theme: "colored",
          });
        }
      });
  };

  return (
    <React.Fragment>
      <h5 className="main-titel">Add New Student</h5>
      <div className="add-new-student">
        <div className="card">
          <input
            type="search"
            id="student_name"
            value={Data.student_name}
            onChange={(e) => SetData({ ...Data, student_name: e.target.value })}
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
          <button onClick={() => HandeADD()}> Add</button>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default AddNewStudent;
