import user from "../../../img/user.png";
import Typewriter from "typewriter-effect";
import "./header.css";
function Head() {
  return (
    <div className="header-main">
      <h3 className="center-flex">
        <span className="eee mr-10">You are </span>
        <span className="red-color inlines">
          <Typewriter
            options={{
              strings: [" Stronger 💪", " Powerfull 🏋️‍♀️"],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </h3>
      <div className="icons">
        <span className="notification p-relative">
          <i className="fa-regular fa-bell fa-lg"></i>
        </span>
        <img src={user} alt="" />
      </div>
    </div>
  );
}

export default Head;
