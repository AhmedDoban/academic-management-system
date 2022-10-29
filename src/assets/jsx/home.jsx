import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  state = {
    student: [],
  };
  async componentDidMount() {
    let { data } = await axios.get("http://localhost:3000/student");
    this.setState({ student: data });
  }
  render() {
    return (
      <React.Fragment>
        <div className="landing home center-flex col-flex">
          <h1 className="p-relative color-green">
            <span className="color-orange">HI ! </span>
            sudent or parent
          </h1>
          <p className="d-block p-relative">Enter password to continue</p>

          <div className="p-relative center-flex col-flex gap-20 input-section">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your password"
              required
            />

            <Link
              to={{
                pathname: "/home/parent",
              }}
              className="width-full"
            >
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
