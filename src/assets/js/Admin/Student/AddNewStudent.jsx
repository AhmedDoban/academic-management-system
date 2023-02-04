import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddNewStudent() {
  const [profilePicture, SetprofilePicture] = useState();
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

  const handleFileSelected = (e) => {
    let image = document.getElementById("Img");
    image.src = URL.createObjectURL(e.target.files[0]);
    SetprofilePicture(image.src);
  };
  let Navigate = useNavigate();

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
      })
      .then(function (response) {
        Navigate("/student");
      })
      .catch(function (error) {
        console.log(error);
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
            <button type="submit">Add Student</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
export default AddNewStudent;
