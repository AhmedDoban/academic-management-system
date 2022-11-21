import user from "../../img/user.png";
function Share(props) {
  return (
    <div className="Share width-full bg-fff p-20 box-Shadow">
      <div className="Share-input center-flex gap-20">
        <img src={user} alt="user avatar" className="img-Small " />
        <input type="text" placeholder="What is in your mind ..? " />
      </div>
      <div className="spritter mt-20 mb-20"></div>
      <div className="icons between-flex">
        <div className="shareoption center-flex gap-10">
          <i className="fa-solid fa-images"></i>
          <p> photo and video</p>
        </div>
        <div className="shareoption center-flex gap-10">
          <i className="fa-solid fa-tag"></i>
          <p>Tag</p>
        </div>
        <div className="shareoption center-flex gap-10">
          <i className="fa-solid fa-location-dot"></i>
          <p>Location</p>
        </div>
        <div className="shareoption center-flex gap-10  ">
          <i className="fa-solid fa-face-smile-wink"></i>
          <p>Feeling</p>
        </div>
      </div>
      <button className="main-btn btn-shape width-full mt-10">Share</button>
    </div>
  );
}

export default Share;
