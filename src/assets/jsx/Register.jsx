import React from "react";
import Blobs from "./Blobs";
import { Link } from "react-router-dom";
import axios from "axios";
class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    date: "",
    courses: [],
    error: {},
  };
  isEmptyObject = (value) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
  };
  HandleChange = (e) => {
    // clone
    let state = { ...this.state };
    //edit
    state[e.currentTarget.name] = e.currentTarget.value;
    //set state
    this.setState(state);
  };
  HandleSubmit = async (e) => {
    const error = this.Validate();
    if (error) {
      e.preventDefault();
      return;
    }
    // upload to json file if it true validation or in other hand errors is null
    const obj = { ...this.state , pa_password : "pa-0000",  stu_password : "stu-0000"};
    delete obj.error;
    await axios.post("http://localhost:3000/students", obj);
  };

  Validate = () => {
    const error = {};

    if (!this.state.firstName.trim().match(/[a-zA-Z][a-zA-Z ]{3,30}/)) {
      error.firstName = "at least 3 character";
    }
    if (!this.state.lastName.trim().match(/[a-zA-Z][a-zA-Z ]{3,30}/)) {
      error.lastName = "at least 3 character";
    }
    if (
      !this.state.email
        .trim()
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      error.email = "please enter email in right way";
    }
    if (this.state.phone.trim() === "") {
      error.phone = "please enter phone in right way";
    }

    if (this.state.date.trim() === "") {
      error.date = "please enter date in right way";
    }
    if (
      !this.state.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
      )
    ) {
      error.password = "please enter correct password";
    }
    if (this.state.re_password !== this.state.password) {
      error.re_password = "please enter the same password";
    }

    this.setState({ error });
    return this.isEmptyObject(error) ? null : error;
  };

  render() {
    return (
      <React.Fragment>
        <div className="Signin">
          <Blobs />
          <div className="container center-flex gap-20">
            <h1>Welocme</h1>
            <p>Register now to get full access</p>
            <form action="" className="center-flex gap-20 col-flex width-full">
              <div className="display-flex gap-20">
                <div className="display-flex col-flex">
                  <input
                    onChange={this.HandleChange}
                    value={this.state.firstName}
                    type="text"
                    name="firstName"
                    id=""
                    placeholder="first name"
                    required
                  />
                  {this.state.error.firstName && (
                    <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                      {this.state.error.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    onChange={this.HandleChange}
                    value={this.state.lastName}
                    type="text"
                    name="lastName"
                    id=""
                    placeholder="last name"
                    required
                  />
                  {this.state.error.lastName && (
                    <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                      {this.state.error.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="width-full">
                <input
                  onChange={this.HandleChange}
                  value={this.state.email}
                  type="email"
                  name="email"
                  id=""
                  placeholder="Enter Your Email"
                  required
                />
                {this.state.error.email && (
                  <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                    {this.state.error.email}
                  </div>
                )}
              </div>
              <div className="width-full">
                <input
                  onChange={this.HandleChange}
                  value={this.state.password}
                  type="password"
                  name="password"
                  id=""
                  placeholder="Enter Your password"
                  required
                />
                {this.state.error.password && (
                  <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                    <ul>
                      <li> At least 1 alphabet </li>
                      <li> At least 1 digit</li>
                      <li> Contains no space</li>
                      <li>Optional special characters </li>
                      <li> Minimum 8 characters long</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="width-full">
                <input
                  onChange={this.HandleChange}
                  value={this.state.re_password}
                  type="password"
                  name="re_password"
                  id=""
                  placeholder="re-enter Your password"
                  required
                />
                {this.state.error.re_password && (
                  <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                    {this.state.error.re_password}
                  </div>
                )}
              </div>

              <div className="display-flex gap-20">
                <div className="width-full">
                  <input
                    onChange={this.HandleChange}
                    type="date"
                    name="date"
                    id=""
                    value={this.state.date}
                    required
                  />
                  {this.state.error.date && (
                    <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                      {this.state.error.date}
                    </div>
                  )}
                </div>
                <div className="width-full">
                  <input
                    onChange={this.HandleChange}
                    value={this.state.phone}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="01#########"
                    pattern="^01[0125][0-9]{8}$"
                    required
                  />
                  {this.state.error.phone && (
                    <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                      {this.state.error.phone}
                    </div>
                  )}
                </div>
              </div>
              <Link
                to={{
                  pathname: "/Signin",
                }}
                className="width-full"
                replace
              >
                <button
                  type="submit"
                  className="center-flex gap-20 main-btn width-full"
                  onClick={this.HandleSubmit}
                >
                  <i className="fas fa-arrow-right-to-bracket "></i> Register
                </button>
              </Link>
            </form>

            <p>
              did you have an account
              <Link to="/Signin" replace>
                Signin
              </Link>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;
