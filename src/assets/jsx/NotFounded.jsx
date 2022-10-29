import React from "react";
import notfound from "../img/sorry.png";
import { Link } from "react-router-dom";
class NotFounded extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="NotFounded width-full center-flex txt-center gap-20 col-flex">
          <div className="container">
            <img src={notfound} alt="" />
            <h4 className="text">
              Oops...
              <br />
              We are sorry but the page you Were locking for Was not Found...!
              <p>Error 404 ....</p>
            </h4>
            <Link to="/" className="btn-shape color-white  font-25">
              Go Back
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default NotFounded;
