import React from "react";
import Blobs from "./Blobs";
import { Link } from "react-router-dom";
import axios from "axios";
class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: {},
  };
  new_data = {};
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
    // else
    const obj = { ...this.new_data };
    await axios.post("http://localhost:3000/student", obj);
  };

  Validate = () => {
    const error = {};
    let state = { ...this.props.state };
    for (let i = 0; i < state.students.length; i++) {
      if (
        state.students.at(i).email !== this.state.email.trim() &&
        state.students.at(i).password !== this.state.password
      ) {
        error.email = "please check your email";
        error.password = "please check your password";
        return;
      }
      if (
        state.students.at(i).email === this.state.email.trim() &&
        state.students.at(i).password === this.state.password
      ) {
        this.new_data = state.students.at(i);
        break;
      }
    }
    this.setState({ error });
    return this.isEmptyObject(error) ? null : error;
  };

  render() {
    return (
      <React.Fragment>
        <div className="Signin ">
          <Blobs />
          <div className="container center-flex gap-20 ">
            <h1>Login</h1>
            <p className="txt-center">
              Welcome back ! login to get full access
              <span className="display-block ">
                did you
                <Link to="">forget your password ?</Link>
              </span>
            </p>
            <form action="" className="center-flex gap-20 col-flex width-full ">
              <div className="width-full">
                <input
                  onChange={this.HandleChange}
                  value={this.state.email}
                  type="email"
                  name="email"
                  id="email"
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
                  id="password"
                  placeholder="Enter Your password"
                  required
                />
                {this.state.error.password && (
                  <div className="error-alart bg-215 p-5 color-black txt-center mt-5  rd-6 font-13">
                    {this.state.error.password}
                  </div>
                )}
              </div>

              <Link
                to={{
                  pathname: "/home",
                }}
                className="width-full"
                replace
              >
                <button
                  type="submit"
                  className="center-flex gap-20 main-btn width-full"
                  onClick={this.HandleSubmit}
                >
                  <i className="fas fa-arrow-right-to-bracket "></i> Continue
                </button>
              </Link>
            </form>

            <p>
              don't have an account
              <Link to="/Register" replace>
                Register now
              </Link>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Signin;
