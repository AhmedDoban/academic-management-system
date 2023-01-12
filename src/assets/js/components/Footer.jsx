import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container p-relative grid-30-350px">
          {/******************** Box1 Contact social ********************************/}
          <div
            className="contact"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1 className="color-white ">academic management system</h1>
            <p>Now You Can Follow us </p>
            <div className="social center-flex gap-10">
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-whatsapp"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-telegram"></i>
              </Link>
            </div>
          </div>
          {/******************** Box2 Apps ********************************/}
          <div
            className="contact"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1 className="color-white ">download App</h1>
            <p>You Can Download Our App Work on different OS</p>
            <div className="Apps">
              <Link className="display-flex">
                <i className="fa-brands fa-google-play"></i>
                <div className="app-discription">
                  <p>Get it Now</p>
                  <h5>Google Play</h5>
                </div>
              </Link>
              <Link className="display-flex">
                <i className="fa-brands fa-app-store-ios"></i>
                <div className="app-discription">
                  <p>Download on the</p>
                  <h5>App Store</h5>
                </div>
              </Link>
            </div>
          </div>
          {/******************** Box3 map ********************************/}
          <div
            className="contact"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <h1 className="color-white ">Find Us</h1>
            <p>
              You Can Find Our lcation in this Map. We are Waiting you there
            </p>
            <div className="Map">
              <iframe
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=fucalty of computer and information tanta&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%"
                height="200"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          {/******************** End Boxs ********************************/}
        </div>
        {/******************** End Container ********************************/}
      </div>
    </React.Fragment>
  );
}
export default Footer;
