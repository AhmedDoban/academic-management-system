import React from "react";
import Head from "../../components/Header/Head";
import Blobs from "./../../components/Blobs/Blobs";
import "./Tasks.css";
function Tasks(props) {
  return (
    <React.Fragment>
      <Blobs />
      <Head />
      <div className="tasks">
        <div className="container">
          <h1 className="main-titel-2 ">Class Room</h1>
          <div className="cards-container">
            {/********************** Next Up **************************/}
            <div
              className="card"
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <div className="header-card">
                <h5>Next Up</h5>
                <p className="Next">5</p>
              </div>
              {/********************** Next Cards Wrapper **************************/}
              <div
                data-aos="fade-down"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="card-body">
                  <p>Details</p>
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis vitae ex delectus quisquam voluptatem rem mollitia
                    maxime dignissimos reprehenderit. At illum saepe sit
                    assumenda, fuga dicta rerum esse quia debitis?
                  </h5>
                </div>
                <div className="footer-card Next">
                  <p>
                    <i className="fa-regular fa-clock"></i> Mar 26
                  </p>
                  <label htmlFor="FileUpload">
                    <span>
                      Upload File <i class="fa-solid fa-angles-up"></i>
                    </span>
                    <input type="file" name="" id="FileUpload" />
                  </label>
                </div>
              </div>
              {/********************** Next Cards Wrapper End **************************/}
            </div>
            {/********************** In progress **************************/}
            <div
              className="card"
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <div className="header-card">
                <h5>In progress</h5>
                <p className="progress">5</p>
              </div>
              {/********************** In progress Cards Wrapper **************************/}
              <div
                data-aos="fade-down"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="card-body">
                  <p>Details</p>
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis vitae ex delectus quisquam voluptatem rem mollitia
                    maxime dignissimos reprehenderit. At illum saepe sit
                    assumenda, fuga dicta rerum esse quia debitis?
                  </h5>
                </div>
                <div className="footer-card progress">
                  <p>
                    <i className="fa-regular fa-clock"></i> Mar 26
                  </p>
                </div>
              </div>
              {/********************** In progress Cards Wrapper End **************************/}
            </div>
            {/********************** Complete **************************/}
            <div
              className="card"
              data-aos="fade-down"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <div className="header-card">
                <h5>Complete</h5>
                <p className="Complete">5</p>
              </div>
              {/********************** Complete Cards Wrapper **************************/}
              <div
                data-aos="fade-down"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="card-body">
                  <p>Details</p>
                  <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis vitae ex delectus quisquam voluptatem rem mollitia
                    maxime dignissimos reprehenderit. At illum saepe sit
                    assumenda, fuga dicta rerum esse quia debitis?
                  </h5>
                </div>
                <div className="footer-card Complete">
                  <p>
                    <i className="fa-regular fa-clock"></i> Mar 26
                  </p>
                </div>
              </div>
              {/********************** Complete Card Wrapper End **************************/}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Tasks;
