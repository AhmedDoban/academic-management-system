import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function UpDataStudentInfo() {
  const params = useParams([]);
  const [Student, setStudent] = useState({});
  let Navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/students/${params.id}`)
      .then((response) => {
        setStudent(response.data);
      });
  }, []);

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
  const [gender, setGender] = useState("");

  useEffect(() => {
    Student.gender === "male" ? setGender("male") : setGender("female");
    SetFirstName(Student.firstName);
    SetLastName(Student.lastName);
    SetEmail(Student.email);
    SetPassword(Student.password);
    SePhone(Student.phone);
    SetDate(Student.date);
    SetCountry(Student.country);
    SetCity(Student.city);
    SeGpa(Student.gpa);
    SetName(Student.fatherInfo?.name);
    SetPhoneNumber(Student.fatherInfo?.PhoneNumber);
    SetJob(Student.fatherInfo?.job);
    SetprofilePicture(Student.profilePicture);
  }, [Student]);

  const handleFileSelected = (e) => {
    let image = document.getElementById("Img");
    image.src = URL.createObjectURL(e.target.files[0]);
    SetprofilePicture(image.src);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/students/${params.id}`, {
        profilePicture,
        firstName,
        lastName,
        email,
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
            <label className="-label" htmlFor="file">
              <i className="fa-solid fa-camera"></i>
              <span>Change Image</span>
            </label>
            <img src={profilePicture} name="Img" alt="Img" id="Img" />
            <input onChange={handleFileSelected} type="file" />
          </div>
          <div className="inpus-filds-container">
            <h5 className="main-titel-2">Student Details</h5>
            <input
              type="text"
              placeholder="FIRST NAME"
              value={firstName}
              onChange={(e) => SetFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="LAST NAME"
              value={lastName}
              onChange={(e) => SetLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            <input
              type="tel"
              placeholder="PHONE"
              value={phone}
              onChange={(e) => SePhone(e.target.value)}
            />
            <input
              type="date"
              placeholder="DATE OF BIRTH"
              value={date}
              onChange={(e) => SetDate(e.target.value)}
            />
            <div className="gender">
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="Gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="Female">Female</label>
              <input
                type="radio"
                name="Gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <h5 className="main-titel-2">More Details</h5>
            <input
              type="text"
              placeholder="COUNTRY"
              value={country}
              onChange={(e) => SetCountry(e.target.value)}
            />
            <input
              type="text"
              placeholder="CITY"
              value={city}
              onChange={(e) => SetCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="GPA"
              value={gpa}
              onChange={(e) => SeGpa(e.target.value)}
            />
            <h5 className="main-titel-2">Parent Details</h5>
            <input
              type="text"
              placeholder="PARENT NAME"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="PARENT PHONE NUmber"
              value={PhoneNumber}
              onChange={(e) => SetPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="PARENT WORK"
              value={job}
              onChange={(e) => SetJob(e.target.value)}
            />
            <h5 className="main-titel-2">Student Courses</h5>
            <button type="submit">Update Student</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
export default UpDataStudentInfo;
