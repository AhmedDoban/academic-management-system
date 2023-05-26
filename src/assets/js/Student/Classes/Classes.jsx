import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";
import Dots from "../../components/Dots/Dots";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import LodingFeachData from "./../../components/Loding Feach Data/LodingFeachData";

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
  const [student_id, setStudent_id] = useState([]);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };

  const [Classes, SetClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${process.env.REACT_APP_API}/select_sub_generation.php`;

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        setLoading(true);
        await axios
          .post(
            url,
            { student_id: student_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetClasses(response.data.message);
            }
          });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, student_id]);

  const [Search, setSearch] = useState("");

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <SELECT_SUB_GENERATION
              Search={Search}
              setSearch={setSearch}
              loading={loading}
              Classes={Classes}
              show={show}
              showMore={showMore}
              style={style}
              visible={visible}
            />
          }
        />
        <Route
          path=":generation_id"
          element={<Select_Sub_generationSubjects />}
        />
      </Routes>
    </React.Fragment>
  );
}

function SELECT_SUB_GENERATION(props) {
  return (
    <React.Fragment>
      {props.loading ? (
        <LodingFeachData />
      ) : (
        <div
          className="student-courses-container"
          id="student-courses-container"
        >
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
            <div className="header">
              <div className="input-absulote">
                <input
                  type="text"
                  className="width-full"
                  placeholder="Search for Class Name"
                  value={props.Search}
                  onChange={(e) => props.setSearch(e.target.value)}
                />
              </div>

              <i
                className="fa-solid fa-border-all style active"
                onClick={props.style}
                data-style="grid"
              ></i>
              <i
                className="fa-solid fa-grip-lines style"
                onClick={props.style}
                data-style="list"
              ></i>
            </div>
            {/**************** End *******************************/}

            {props.Classes.length > 0 ? (
              <React.Fragment>
                {/**************** Show data from state *******************************/}
                <div className={`container-courses ${props.show}`}>
                  {props.Classes.filter((items) => {
                    return props.Search.toLowerCase() === ""
                      ? items
                      : items.generation_name
                          .toLowerCase()
                          .includes(props.Search);
                  })
                    .slice(0, props.visible)
                    .map((p) => (
                      <div className="card" key={p.generation_id}>
                        <div className="info">
                          <Player
                            autoplay={true}
                            loop={true}
                            controls={false}
                            src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                            className="PLayer"
                          ></Player>
                          <div className="footer-container-cousres width-full">
                            <div className="box-footer between-flex width-full">
                              <p>
                                <span>{p.generation_name} </span>
                              </p>
                              <Link
                                to={`/Class Room/${p.generation_id}`}
                                onClick={() => props.setItem(p)}
                              >
                                <i className="fa-solid fa-arrow-right rd-half color-white"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {props.Classes.length >= props.visible ? (
                  <button className="btn-shape_2 " onClick={props.showMore}>
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
      )}
    </React.Fragment>
  );
}

function Select_Sub_generationSubjects() {
  const params = useParams();
  const [visible, setVisible] = useState(8);
  const showMore = () => setVisible((p) => p + 3);

  const [student_id, setStudent_id] = useState([]);
  const [show, setShow] = useState("grid");
  const [Search, setSearch] = useState("");

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setStudent_id(response.student_id);
    } catch (error) {
      throw error;
    }
  };

  const [Classes, SetClasses] = useState([]);

  const url = `${process.env.REACT_APP_API}/select_sub_generation.php`;

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        await axios
          .post(
            url,
            { student_id: student_id },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetClasses(
                response.data.message.filter(
                  (p) => p.generation_id === params.generation_id
                )[0]
              );
            }
          });
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [url, student_id]);

  return (
    <React.Fragment>
      <div className="Select_Sub_generationSubjects p-relative">
        {/**************************** Titel  **********************************************/}
        <h1
          className="main-titel"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          <div className="div-circle"></div>
          <div className="div-circle"></div>
          <span>{Classes.generation_name} </span>
        </h1>
        {/**************************** End Titel **********************************************/}

        {/**************************** Dots**********************************************/}
        <Dots OtherStyle="top" />
        <Dots OtherStyle="bottom" />
        {/**************************** Start Container **********************************************/}
        <div className="container">
          {/**************************** Header Search and show style**********************************************/}
          <div
            className="header "
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <div className="input-absulote">
              <input
                type="text"
                className="width-full"
                placeholder="Search for subject Name"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <i
              className="fa-solid fa-border-all style active"
              onClick={() => setShow("grid")}
              data-style="grid"
            ></i>
            <i
              className="fa-solid fa-grip-lines style"
              onClick={() => setShow("list")}
              data-style="list"
            ></i>
          </div>
        </div>
        {/**************************** End Container **********************************************/}

        {/**************************** Start Container **********************************************/}
        <div className={`container ${show}`}>
          {Classes.subjects
            ?.filter((searchData) => {
              return Search === ""
                ? searchData
                : searchData.subject_name.toLowerCase().includes(Search);
            })
            .slice(0, visible)
            .map((p) => (
              <Link
                className="Card"
                data-aos="fade-right"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
                to={`/Subject Data/${p.subject_id}/${p.subject_name}?`}
                key={p.id}
              >
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets4.lottiefiles.com/packages/lf20_4XmSkB.json"
                  className="PLayer"
                ></Player>
                <div className="data">
                  <h3>{p.subject_name}</h3>
                  <p> {p.subject_description}</p>
                </div>
              </Link>
            ))}
        </div>
        {/**************************** End Container **********************************************/}
      </div>
    </React.Fragment>
  );
}

export default Courses;
