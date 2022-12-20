import React from "react";

function StudentSettingPage(props) {
  return (
    <React.Fragment>
      <div className="StudentSettingPage">
        <div className="container">
          <div className="img-name-settingpage">
            <img src={require("../../img/avatars/1.jpeg")} alt="slide 1 " />
            <h1>Omnia El-barbary</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentSettingPage;
