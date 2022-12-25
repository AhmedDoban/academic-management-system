import React, { Component } from "react";
import { Link } from "react-router-dom";

function WhatOffer(props) {
  return (
    <React.Fragment>
      <div className="spikes-rotated"></div>
      <div
        className="WhatOffer"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <h1 className="main-titel">
          <div className="div-circle"></div>
          <div className="div-circle"></div>
          <span>What We Offer ?</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          asperiores eligendi odit impedit quas est cum tempora, animi commodi
          nemo illum sed aliquid natus debitis! Harum veritatis facere
          laudantium veniam.
        </p>
        <div className="container">
          {/******************** Box1 ********************************/}
          <div className="box between-flex">
            <div
              className="left"
              data-aos="fade-right"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <h1 className="box-titel">General Courses</h1>
              <p className="color-black mt-25 mb-25 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                doloribus ipsam magnam suscipit? Distinctio dolor voluptate quod
                eum deleniti earum tenetur at praesentium laudantium! Sed,
                mollitia! Ipsa porro ad dolorem.
              </p>
              <ul>
                <li>Speak English more confidently.</li>
                <li>
                  Have a deeper knowledge of the structure of English grammar.
                </li>
                <li>Better understand spoken English.</li>
                <li>
                  Produce the target structures confidently and accurately.
                </li>
              </ul>
            </div>
            <div
              className="right"
              data-aos="fade-left"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <img src={require("../../img/wtOFFER/wt1.png")} alt="offer" />
            </div>
          </div>
          {/******************** End ********************************/}
          {/******************** Box2 ********************************/}
          <div className="box between-flex gap-20">
            <div
              className="right"
              data-aos="fade-right"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <img src={require("../../img/wtOFFER/wt3.png")} alt="offer" />
            </div>
            <div
              className="left"
              data-aos="fade-left"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <h1 className="box-titel">Language for Business</h1>
              <p className="color-black mt-25 mb-25 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                doloribus ipsam magnam suscipit? Distinctio dolor voluptate quod
                eum deleniti earum tenetur at praesentium laudantium! Sed,
                mollitia! Ipsa porro ad dolorem.
              </p>
            </div>
          </div>
          {/******************** End ********************************/}
          {/******************** Box3 ********************************/}
          <div className="box between-flex">
            <div
              className="left"
              data-aos="fade-right"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <h1 className="box-titel">Online Learning</h1>
              <p className="color-black mt-25 mb-25 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                doloribus ipsam magnam suscipit? Distinctio dolor voluptate quod
                eum deleniti earum tenetur at praesentium laudantium! Sed,
                mollitia! Ipsa porro ad dolorem.
              </p>
              <Link to="">
                Try Now <i class="fa-solid fa-rocket"></i>
              </Link>
            </div>
            <div
              className="right"
              data-aos="fade-left"
              data-aos-easing="ease-in-out"
              data-aos-duration="1000"
            >
              <img src={require("../../img/wtOFFER/wt2.png")} alt="offer" />
            </div>
          </div>
          {/******************** End ********************************/}
        </div>
      </div>
      <div className="spikes"></div>
    </React.Fragment>
  );
}
export default WhatOffer;
