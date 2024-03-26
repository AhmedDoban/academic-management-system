import React from "react";
import "./SammaryData.css";

function SammaryData(props) {
  return (
    <React.Fragment>
      <div className="sammaryData">
        <div className="container" data-aos="fade-up">
          {/******************** Header info ********************************/}
          <div className="header-data">
            <h1 className="main-title">Learn With Us , Improve With Us</h1>
          </div>
          {/******************** Footer Data ********************************/}
          <div className="footer-data grid-30-350px">
            {/******************** Box1 ********************************/}
            <div className="box p-20 center-flex gap-20">
              <i className="fa-solid fa-book"></i>
              <div className="data-box">
                <p>Library with 50,000+ Books</p>
              </div>
            </div>
            {/******************** Box2 ********************************/}
            <div className="box p-20 center-flex gap-20">
              <i className="fa-solid fa-graduation-cap"></i>
              <div className="data-box">
                <p>70,000+ Graduates</p>
              </div>
            </div>
            {/******************** Box3 ********************************/}
            <div className="box p-20 center-flex gap-20">
              <i className="fa-sharp fa-solid fa-desktop"></i>
              <div className="data-box">
                <p>Latest Computer Studies</p>
              </div>
            </div>
            {/******************** End Boxs ********************************/}
          </div>
          {/******************** End Footer Data ********************************/}
        </div>
        {/******************** End container ********************************/}
      </div>
    </React.Fragment>
  );
}
export default SammaryData;
