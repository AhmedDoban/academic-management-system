import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
function AddNewStudent() {
  let Navigate = useNavigate();

  const [profilePicture, SetprofilePicture] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone, SePhone] = useState("");
  const [date, SetDate] = useState("");
  const [country, SetCountry] = useState("");
  const [city, SetCity] = useState("");
  const [gpa, SeGpa] = useState("");
  const [name, SetName] = useState("");
  const [job, SetJob] = useState("");
  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [CoursesID, setCoursesID] = useState([]);
  const [Courses, SetCourses] = useState({});
  const [ADDCourseFiled, SetADDCourseFiled] = useState("");

  const visable =
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    phone === "" ||
    country === "" ||
    city === "" ||
    gpa === "" ||
    name === "" ||
    job === ""
      ? true
      : false;

  useEffect(() => {
    axios.get(`http://localhost:3000/CourcesDB`).then((response) => {
      SetCourses(response.data);
    });
  }, []);

  const handleFileSelected = (e) => {
    let image = document.getElementById("Img");
    image.src = URL.createObjectURL(e.target.files[0]);
    SetprofilePicture(image.src);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/students", {
        profilePicture,
        firstName,
        lastName,
        email: email + "@student.com",
        password,
        phone,
        date,
        country,
        city,
        fatherInfo: {
          name,
          job,
          PhoneNumber,
        },
        gpa,
        gender,
        CoursesID,
      })
      .then(function (response) {
        Navigate("/student");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteCourse = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't Delete this Record `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < CoursesID.length; i++) {
          if (CoursesID[i] === e) {
            //clone
            let arr = [...CoursesID];
            // edit
            arr.splice(i, 1);
            // update
            setCoursesID(arr);
          }
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const HandlerAddCourse = () => {
    if (!ADDCourseFiled) {
      toast.error("input empty", {
        autoClose: 15000,
        theme: "dark",
      });
      return;
    }
    Courses.map((ele) =>
      ADDCourseFiled === ele.CourcesName ? CheckCourse(ADDCourseFiled) : null
    );
  };
  const CheckCourse = (ADDCourseFiled) => {
    CoursesID.includes(ADDCourseFiled)
      ? toast.error("Alredy Added", {
          autoClose: 15000,
          theme: "dark",
        })
      : addCourseHandelar();
  };
  const addCourseHandelar = () => {
    // clone
    let new_Course = [...CoursesID];
    // Edit
    new_Course.push(ADDCourseFiled);
    // update
    setCoursesID(new_Course);
    toast.success("Course added successfly", {
      autoClose: 15000,
      theme: "colored",
    });
  };

  return (
    <React.Fragment>
      <div className="add-new-student">
        <h5 className="main-titel-2">Add New Student</h5>
        <form onSubmit={HandleSubmit}>
          <div className="img-container">
            <label class="-label" for="file">
              <i class="fa-solid fa-camera"></i>
              <span>Change Image</span>
            </label>
            <img
              src={require("../../../img/user.png")}
              name="Img"
              alt="Img"
              id="Img"
            />
            <input onChange={handleFileSelected} type="file" />
          </div>
          <div className="inpus-filds-container">
            <h5 className="main-titel-2">Student Details</h5>
            <input
              type="text"
              placeholder="FIRST NAME"
              onChange={(e) => SetFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="LAST NAME"
              onChange={(e) => SetLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="EMAIL"
              onChange={(e) => SetEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="PASSWORD"
              onChange={(e) => SetPassword(e.target.value)}
            />
            <input
              type="tel"
              placeholder="PHONE"
              onChange={(e) => SePhone(e.target.value)}
            />
            <input
              type="date"
              placeholder="DATE OF BIRTH"
              onChange={(e) => SetDate(e.target.value)}
            />
            <div className="gender">
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="Gender"
                id="Male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="Female">Female</label>
              <input
                type="radio"
                name="Gender"
                id="Female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <h5 className="main-titel-2">More Details</h5>
            <input
              type="text"
              placeholder="COUNTRY"
              onChange={(e) => SetCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="CITY"
              onChange={(e) => SetCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="GPA"
              onChange={(e) => SeGpa(e.target.value)}
            />
            <h5 className="main-titel-2">Parent Details</h5>
            <input
              type="text"
              placeholder="PARENT NAME"
              onChange={(e) => SetName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="PARENT PHONE NUmber"
              onChange={(e) => SetPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="PARENT WORK"
              onChange={(e) => SetJob(e.target.value)}
            />
            <h5 className="main-titel-2">Student Courses</h5>
            <div className="data">
              <div className="right">
                <input
                  type="text"
                  placeholder="Enter Course Id "
                  value={ADDCourseFiled}
                  onChange={(e) => SetADDCourseFiled(e.target.value)}
                />
                <input
                  type="button"
                  value="Add Course"
                  onClick={HandlerAddCourse}
                />
                <ol>
                  {CoursesID?.map((p) => (
                    <li key={p} className="between-flex">
                      <span>{p}</span>
                      <i
                        className="fa-sharp fa-solid fa-trash color-red"
                        onClick={() => handleDeleteCourse(p)}
                      ></i>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <button type="submit" disabled={visable}>
              Add Student
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default AddNewStudent;
