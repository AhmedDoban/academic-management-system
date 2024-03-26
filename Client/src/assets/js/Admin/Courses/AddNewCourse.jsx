import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Courses.css";
import axios from "axios";

export default function AddNewCourse() {
  let Navigate = useNavigate();

  const [Data, SetData] = useState({
    subject_name: "",
    subject_description: "",
    generation_id: "",
  });

  const HandeADD = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}admin/create_subject.php`, Data, {
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
          Navigate("/Classes");
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
      <h5 className="main-title">Add New Class</h5>
      <div className="add-new-Class">
        <div className="card">
          <input
            type="search"
            id="subject_name"
            value={Data.subject_name}
            onChange={(e) => SetData({ ...Data, subject_name: e.target.value })}
            placeholder=" "
          />
          <label htmlFor="subject_name">Subject Name</label>
        </div>
        <div className="card">
          <input
            type="search"
            id="subject_description"
            value={Data.subject_description}
            onChange={(e) =>
              SetData({ ...Data, subject_description: e.target.value })
            }
            placeholder=" "
          />
          <label htmlFor="subject_description">Subject Description</label>
        </div>
        <div className="card">
          <input
            type="search"
            id="generation_id"
            value={Data.generation_id}
            onChange={(e) =>
              SetData({ ...Data, generation_id: e.target.value })
            }
            placeholder=" "
          />
          <label htmlFor="generation_id">Generation Id</label>
        </div>
        <div className="card">
          <button onClick={() => HandeADD()}> Add</button>
        </div>
      </div>
    </React.Fragment>
  );
}
