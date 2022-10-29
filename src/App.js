import React from "react";
import "./assets/css/normalize.css";
import "./assets/css/framework.css";
import "./assets/css/style.css";
import Register from "./assets/jsx/Register";
import Signin from "./assets/jsx/Signin";
import NotFounded from "./assets/jsx/NotFounded";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./assets/jsx/home";
class App extends React.Component {
  state = {
    students: [],
  };
  async componentDidMount() {
    let { data } = await axios.get("http://localhost:3000/students");
    this.setState({ students: data });
  }
  Scrool = (e) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <i className="fas fa-arrow-up back-to-top" onClick={this.Scrool}></i>
          <Routes>
            <Route
              path="/Register"
              element={
                <Register
                  componentDidMount={this.componentDidMount}
                  pushData={this.pushData}
                  {...this.props}
                />
              }
            />
            <Route path="/Signin" element={<Signin state={this.state} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Register />} />
            <Route path="*" element={<NotFounded to="/NotFounded" />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
