import React from "react";
import { Link } from "react-router-dom";

function SammaryData(props) {
  return (
    <React.Fragment>
      <div className="sammaryData">
        <div
          className="container"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          {/******************** Header info ********************************/}
          <div className="header-data">
            <h1>
              Learn With Us. <br />
              Improve With Us
            </h1>
            <Link to="">
              Start Now <i className="fa-solid fa-rocket"></i>{" "}
            </Link>
          </div>
          {/******************** Footer Data ********************************/}
          <div className="footer-data grid-30-350px">
            {/******************** Box1 ********************************/}
            <div
              className="box p-20 center-flex gap-20"
              data-aos="fade-right"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <i className="fa-solid fa-book"></i>
              <div className="data-box">
                <p>Library with 50,000+ Books</p>
                <Link to="/library">
                  read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            {/******************** Box2 ********************************/}
            <div
              className="box p-20 center-flex gap-20"
              data-aos="zoom-out-right"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <div className="data-box">
                <p>70,000+ Graduates</p>
                <Link to="">
                  read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            {/******************** Box3 ********************************/}
            <div
              className="box p-20 center-flex gap-20"
              data-aos="fade-left"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <i className="fa-sharp fa-solid fa-desktop"></i>
              <div className="data-box">
                <p>Latest Computer Studies</p>
                <Link href="">
                  read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            {/******************** End Boxs ********************************/}
          </div>
          {/******************** End Footer Data ********************************/}
        </div>
        {/******************** End container ********************************/}
      </div>
      <div className="spikes-rotated"></div>
    </React.Fragment>
  );
}
export default SammaryData;
