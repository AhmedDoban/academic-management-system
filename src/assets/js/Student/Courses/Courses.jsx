import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CourcesDB } from "../../../../dummyData";
import { Link } from "react-router-dom";

function Courses() {
  const [visible, setVisible] = useState(8);
  const showMore = () => setVisible((p) => p + 3);
  /**************** to change style from grid to list ***********************/
  const [show, setShow] = useState("grid");
  const style = (e) => {
    let btn = document.querySelectorAll(
      ".student-courses-container .header .style"
    );
    btn.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    setShow(e.target.dataset.style);
  };
  /**************** End *******************************************************/

  /**************** Get data and save it in state  ***********************/
  const [input, setInput] = useState();
  let appendNumber = useRef(CourcesDB.length + 1);
  // Create array with student cources slides
  const [slides, setSlides] = useState(
    CourcesDB.map((p) => (
      <React.Fragment>
        <div className="card">
          <div className="card-overlay">
            <img src={p.photo} alt={p.CourcesName} />
          </div>
          <div className="info">
            <img
              src={p.teacher ? p.teacher : require("../../../img/user.png")}
              alt=""
            />
            <div className="footer-container-cousres width-full">
              <h5>{p.CourcesName}</h5>
              <div className="box-footer between-flex width-full">
                <p>
                  <span>DR : </span>
                  {p.CourcesTeacher}
                </p>
                <Link to={`/courses/${p.id}`}>
                  <i class="fa-solid fa-arrow-right rd-half color-white"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ))
  );
  /**************** End***********************/

  /**************** to add course ***********************/
  const append = () => {
    setSlides([
      ...slides,
      <React.Fragment>
        <div className="card">
          <div className="card-overlay">
            <img src={require("../../../img/Courses/html.png")} alt="" />
          </div>
          <div className="info">
            <img src={require("../../../img/avatars/team-1.jpg")} alt="" />
            <div className="footer-container-cousres width-full">
              <h5>{input}</h5>
              <div className="box-footer between-flex width-full">
                <p>
                  <span>DR : </span> AHMED
                </p>
                <i class="fa-solid fa-arrow-right rd-half color-white"></i>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
    ]);
    {
      appendNumber.current++;
    }
    setInput("");
    toast.success("Couse added successfly", {
      autoClose: 15000,
      theme: "colored",
    });
  };
  /**************** End ***********************/

  return (
    <React.Fragment>
      <div className="student-courses-container" id="student-courses-container">
        <h1
          className="main-titel"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          <div className="div-circle"></div>
          <div className="div-circle"></div>
          <span> Student Courses</span>
        </h1>
        <div className="dots-img dots-top"></div>
        <div className="dots-img dots-bottom"></div>

        <div
          className="container"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          {/************************** Start input and some options ****************************/}
          <div className="header between-flex">
            <div className="input-absulote">
              <input
                type="text"
                className="width-full"
                placeholder="Enter The Course ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <i
                class="fa-solid fa-plus"
                onClick={
                  input
                    ? () => append()
                    : () =>
                        toast.error("You must enter id of course first", {
                          autoClose: 15000,
                          theme: "dark",
                        })
                }
              ></i>
            </div>

            <i
              class="fa-solid fa-border-all style active"
              onClick={style}
              data-style="grid"
            ></i>
            <i
              class="fa-solid fa-grip-lines style"
              onClick={style}
              data-style="list"
            ></i>
          </div>
          {/**************** End *******************************/}

          {/**************** Show data from state *******************************/}
          <div className={`container-courses ${show}`}>
            {slides.slice(0, visible).map((slideContent) => slideContent)}
          </div>
          <input
            type="button"
            value="Show More"
            onClick={showMore}
            className="btn-shape_2 m-0 no"
          />
          {/**************** End *******************************/}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default Courses;
