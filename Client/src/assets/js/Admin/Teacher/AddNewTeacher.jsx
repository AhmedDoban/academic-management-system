import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Teacher.css";
import axios from "axios";

function AddNewTeacher() {
  let Navigate = useNavigate();

  const [Data, SetData] = useState({
    doctor_name: "",
    doctor_code: "",
    doctor_pass: "",
  });

  const HandeADD = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}admin/create_doctor.php`, Data, {
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
          Navigate("/teacher");
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
      <h5 className="main-title">Add New Instractor</h5>
      <div className="add-new-teacher">
        <div className="card">
          <input
            type="search"
            id="doctor_name"
            value={Data.doctor_name}
            onChange={(e) => SetData({ ...Data, doctor_name: e.target.value })}
            placeholder=" "
          />
          <label htmlFor="doctor_name">Instractor Name</label>
        </div>
        <div className="card">
          <input
            type="search"
            id="doctor_code"
            value={Data.doctor_code}
            onChange={(e) => SetData({ ...Data, doctor_code: e.target.value })}
            placeholder=" "
          />
          <label htmlFor="doctor_code">Instractor Code</label>
        </div>
        <div className="card">
          <input
            type="search"
            id="doctor_pass"
            value={Data.doctor_pass}
            onChange={(e) => SetData({ ...Data, doctor_pass: e.target.value })}
            placeholder=" "
          />
          <label htmlFor="doctor_pass">Instractor Pass</label>
        </div>
        <div className="card">
          <button onClick={() => HandeADD()}> Add</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AddNewTeacher;
