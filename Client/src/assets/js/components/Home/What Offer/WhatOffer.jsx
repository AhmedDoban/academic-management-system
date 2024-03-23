import React from "react";
import { Link } from "react-router-dom";
import "./WhatOffer.css";
function WhatOffer() {
  return (
    <React.Fragment>
      <div className="WhatOffer">
        <div className="container" data-aos="fade-down">
          <h1 className="main-titel">What We Offer ?</h1>
          <p>
            One of the most oft-used terms after the pandemic is the term “new
            normal.” The new normal in education is the increased use of online
            learning tools. The COVID-19 pandemic has triggered new ways of
            learning. All around the world, educational institutions are looking
            toward online learning platforms to continue with the process of
            educating students
          </p>
          {/******************** Box1 ********************************/}
          <div className="box between-flex">
            <div className="left">
              <h1 className="box-titel">General Courses</h1>
              <p className="color-black mt-25 mb-25 ">
                Most colleges and universities require their students to take
                general education courses, such as psychology, social sciences,
                and foreign language. You may be thinking gen ed courses are a
                waste of time, and honestly, some of them may feel like that.
                But, there are important reasons why college students are
                required to take gen ed courses
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
            <div className="right">
              <img
                src={require("../../../../img/wtOFFER/wt1.png")}
                alt="offer"
              />
            </div>
          </div>
          {/******************** End ********************************/}
          {/******************** Box2 ********************************/}
          <div className="box between-flex gap-20">
            <div className="right">
              <img
                src={require("../../../../img/wtOFFER/wt3.png")}
                alt="offer"
              />
            </div>
            <div className="left">
              <h1 className="box-titel">Language for Business</h1>
              <p className="color-black mt-25 mb-25 ">
                You may have the most advanced widget or the sexiest new
                service, but if you can’t talk about it, you lose out on
                millions of potential customers. Even with the explosive growth
                of translation technology, you’re still at a disadvantage if you
                only speak a single language.
              </p>
            </div>
          </div>
          {/******************** End ********************************/}
          {/******************** Box3 ********************************/}
          <div className="box between-flex">
            <div className="left">
              <h1 className="box-titel">Online Learning</h1>
              <p className="color-black mt-25 mb-25 ">
                The new normal now is a transformed concept of education with
                online learning at the core of this transformation. Today,
                digital learning has emerged as a necessary resource for
                students and schools all over the world. For many educational
                institutes, this is an entirely new way of education that they
                have had to adopt. Online learning is now applicable not just to
                learn academics but it also extends to learning extracurricular
                activities for students as well. In recent months, the demand
                for online learning has risen significantly, and it will
                continue doing so in the future.
              </p>
              <Link to="">
                Try Now <i className="fa-solid fa-rocket"></i>
              </Link>
            </div>
            <div className="right">
              <img
                src={require("../../../../img/wtOFFER/wt2.png")}
                alt="offer"
              />
            </div>
          </div>
          {/******************** End ********************************/}
        </div>
      </div>
    </React.Fragment>
  );
}
export default WhatOffer;
