import React from "react";
import "./abouUS.css";
function AboutUs() {
  return (
    <React.Fragment>
      <div className="aboutUS">
        <h1 className="main-titel">
          <div className="div-circle"></div>
          <div className="div-circle"></div>
          <span>About Us </span>
        </h1>
        <p
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          dignissimos ea ipsa saepe numquam, quibusdam impedit doloribus neque,
          natus quisquam magni vero nesciunt mollitia non, consequatur pariatur
          similique tempora. Eos?
        </p>
        <div className="container" data-aos="fade-up">
          <div className="left">
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit</h3>
            <img src={require("../../../../img/about/about-1.jpg")} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              sunt inventore sit quaerat commodi quibusdam libero unde culpa
              doloribus aut quia officia hic, voluptate ratione veritatis, fugit
              dolor consequuntur perferendis.
            </p>
            <p>
              Temporibus nihil enim deserunt sed ea. Provident sit expedita aut
              cupiditate nihil vitae quo officia vel. Blanditiis eligendi
              possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut
              repellendus nobis tempore doloribus debitis explicabo similique
              sit. Accusantium sed ut omnis beatae neque deleniti repellendus.
            </p>
          </div>
          <div className="right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-circle-check"></i> Ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i> Duis aute irure
                dolor in reprehenderit in voluptate velit.
              </li>
              <li>
                <i className="fa-solid fa-circle-check"></i> Ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate trideta storacalaperda mastiro
                dolore eu fugiat nulla pariatur.
              </li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident
            </p>

            <div className="img-container">
              <img src={require("../../../../img/about/about-2.jpg")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AboutUs;
