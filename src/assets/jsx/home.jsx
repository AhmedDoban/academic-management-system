import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  state = {
    student: [],
    input_password: "",
  };
  async componentDidMount() {
    let { data } = await axios.get("http://localhost:3000/student");
    this.setState({ student: data });
  }
  HandleSubmit = (e) => {
    let state = { ...this.state };
    if (state.student.pa_password === this.state.input_password) {
      console.log("true");
      return "/home/parent";
    }
    if (state.student.stu_password === this.state.input_password) {
      console.log("true");
      return "/home/student";
    } else {
      console.log("not true");
    }
  };
  HandleChange = (e) => {
    // clone
    let input_password = { ...this.state.input_password };
    //edit
    input_password = e.currentTarget.value;
    //set state
    this.setState({ input_password });
  };
  render() {
    return (
      <React.Fragment>
        <div className="landing home center-flex col-flex">
          <h1 className="p-relative color-green">
            <span className="color-orange">HI ! </span>
            sudent ({this.state.student.firstName}) or parent (
            {this.state.student.lastName})
          </h1>
          <p className="d-block p-relative">Enter password to continue</p>

          <div className="p-relative center-flex col-flex gap-20 input-section">
            <input
              value={this.state.input_password}
              onChange={this.HandleChange}
              type="password"
              name="input_password"
              id="password"
              placeholder="Enter Your password"
              required
            />
            <Link to={this.HandleSubmit()} className="width-full">
              <button
                type="submit"
                className="center-flex gap-20 width-full main-btn"
                onClick={this.HandleSubmit}
              >
                <i className="fas fa-arrow-right-to-bracket "></i> Continue
              </button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
