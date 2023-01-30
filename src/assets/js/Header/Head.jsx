import user from "../../img/user.png";
import Typewriter from "typewriter-effect";
function Head(props) {
  return (
    <div className="head">
      <h3 className="center-flex">
        <span className="eee mr-10">You are </span>
        <span className="red-color inlines">
          <Typewriter
            options={{
              strings: [" Stonger 💪", " Powerfull 🏋️‍♀️"],
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
