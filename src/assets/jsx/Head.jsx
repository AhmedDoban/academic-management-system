import user from "../img/user.png";
function Head(props) {
  return (
    <div className="head">
      <div className="search">
        <input type="search" placeholder="Type something here ! " />
      </div>
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
