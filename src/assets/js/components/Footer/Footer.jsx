import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
function Footer(props) {
  return (
    <React.Fragment>
      <div className="footer">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave-path"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave1">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="3"
              fill="rgba(255,255,255, .1)"
            />
          </g>
          <g className="wave2">
            <use
              xlinkHref="#wave-path"
              x="50"
              y="0"
              fill="rgba(255,255,255, .2)"
            />
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" />
          </g>
        </svg>
        
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
                frameBorder="0"
                allowFullScreen
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
