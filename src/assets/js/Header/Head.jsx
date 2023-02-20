import user from "../../img/user.png";
import Typewriter from "typewriter-effect";
import "./header.css";
import AuthUser from "./../Gust/AuthUser";
import { Link } from "react-router-dom";
function Head(props) {
  const { GetToken } = AuthUser();
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
      {!GetToken() ? (
        <div className="link">
          <Link to="login">login</Link>
        </div>
      ) : (
        <div className="icons">
          <span className="notification p-relative">
            <i className="fa-regular fa-bell fa-lg"></i>
          </span>
          <img src={user} alt="" />
        </div>
      )}
    </div>
  );
}

export default Head;
