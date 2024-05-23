import React from "react";
import "./Blobs.css";
const Blobs = (props) => {
  return (
    <React.Fragment>
      <div className="Blobs-general web">
        <img
          src={
            require("../../../img/blob/Signin blob/circle-scatter-Web.svg")
              .default
          }
          alt="circle"
          loading="lazy"
        />
        <img
          src={
            require("../../../img/blob/Signin blob/blob-top-web.svg").default
          }
          alt="circle"
          loading="lazy"
        />
        <img
          src={
            require("../../../img/blob/Signin blob/circle-scatter-orange-web.svg")
              .default
          }
          alt="circle"
          loading="lazy"
        />
      </div>
      <div className="Blobs-general mob">
        <img
          src={
            require("../../../img/blob/Signin blob/circle-scatter-mob.svg")
              .default
          }
          alt="circle"
          loading="lazy"
        />
        <img
          src={
            require("../../../img/blob/Signin blob/blob-top-mob.svg").default
          }
          alt="circle"
          loading="lazy"
        />
        <img
          src={
            require("../../../img/blob/Signin blob/circle-scatter-orange-mob.svg")
              .default
          }
          alt="circle"
          loading="lazy"
        />
      </div>
    </React.Fragment>
  );
};

export default Blobs;
