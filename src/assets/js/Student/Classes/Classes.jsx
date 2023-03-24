import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Dots from "../../components/Dots/Dots";
import axios from "axios";

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
  const [ID, SetID] = useState([]);
  const [Classes, SetClasses] = useState([]);

  const GEtLocal = () => {
    const userString = sessionStorage.getItem("User");
    const User_detail = JSON.parse(userString);
    SetID(User_detail.id);
  };

  const fetchData = useCallback(async () => {
    const data = await axios.get(
      "https://academic-management-system.000webhostapp.com/api/get-student-with-relationship/" +
        ID
    );
    SetClasses(data.data.data.courses);
  });

  useEffect(() => {
    GEtLocal();
    fetchData();
  }, [fetchData, Classes]);

  const [Search, setSearch] = useState("");

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
          <span>Classes </span>
        </h1>
        <Dots OtherStyle="top" />
        <Dots OtherStyle="bottom" />

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
                placeholder="Search for Class Name"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <i
              className="fa-solid fa-border-all style active"
              onClick={style}
              data-style="grid"
            ></i>
            <i
              className="fa-solid fa-grip-lines style"
              onClick={style}
              data-style="list"
            ></i>
          </div>
          {/**************** End *******************************/}

          {Classes.length > 0 ? (
            <React.Fragment>
              {/**************** Show data from state *******************************/}
              <div className={`container-courses ${show}`}>
                {Classes.filter((items) => {
                  return Search.toLowerCase() === ""
                    ? items
                    : items.name.toLowerCase().includes(Search);
                })
                  .slice(0, visible)
                  .map((p) => (
                    <div className="card" key={p.id}>
                      <div className="card-overlay">
                        <img src={p.photo} alt={p.CourcesName} />
                      </div>
                      <div className="info">
                        <img
                          src={
                            p.teacher
                              ? p.teacher
                              : require("../../../img/user.png")
                          }
                          alt=""
                        />
                        <div className="footer-container-cousres width-full">
                          <h5>{p.CourcesName}</h5>
                          <div className="box-footer between-flex width-full">
                            <p>
                              <span>
                                {p.code} : {p.name}
                              </span>
                              {p.CourcesTeacher}
                            </p>
                            <Link to={`/Class Room/${p.id}`}>
                              <i className="fa-solid fa-arrow-right rd-half color-white"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {Classes.length >= visible ? (
                <button className="btn-shape_2 " onClick={showMore}>
                  Show More
                </button>
              ) : null}

              {/**************** End *******************************/}
            </React.Fragment>
          ) : (
            <>
              <div className="NoClassesInserted">
                <h5>
                  There is no Classes Call your Teacher To insert you in Calss
                </h5>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Courses;
