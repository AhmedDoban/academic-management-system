import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

function CourseData(props) {
  // const params = useParams();
  // const [item, setItems] = useState([]);
  // const Api_url = "http://localhost:3000/CourcesDB";
  // useEffect(() => {
  //   axios.get(`${Api_url}/${params.id}`).then((response) => {
  //     setItems(response.data);
  //   });
  // }, []);
  return (
    <React.Fragment>
      <div className="specific-course">
        <div className="course-data-header">
          <div class="container">
            <h3>WELCOME TO Course</h3>
            <h5>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
              quis.
            </h5>
            <a href="#course" class="btn-get-started">
              <i class="fa-solid fa-play"></i>
            </a>
          </div>
        </div>
        <div className="container" id="course">
          <div className="holder">
            <div className="left">
              <div className="top-vedio">
                <p>Videos</p>
              </div>
              <ul>
                <li>
                  How To Create Sub Domain<span>05:18</span>
                </li>
                <li>
                  Playing With The DNS <span>03:18</span>
                </li>
                <li>
                  Everything About The Virtual Hosts <span>05:25</span>
                </li>
                <li>
                  How To Monitor Your Website <span>04:16</span>
                </li>
                <li>
                  Uncharted Beating The Last Boss <span>07:48</span>
                </li>
                <li>
                  Ys Oath In Felghana Overview <span>03:12</span>
                </li>
                <li>
                  Ys Series All Games Ending <span>08:10</span>
                </li>
                <li>
                  Ys Series All Games Ending <span>08:10</span>
                </li>
                <li>
                  Ys Series All Games Ending <span>08:10</span>
                </li>
                <li>
                  Ys Series All Games Ending <span>08:10</span>
                </li>
                <li>
                  Ys Series All Games Ending <span>08:10</span>
                </li>
              </ul>
            </div>
            <div className="right">
              <video className="Frame" controls>
                <source
                  src={require("../../img/Courses/test_vedio.mp4")}
                  type="video/mp4"
                />
              </video>
              <div class="info">Everything About The </div>
            </div>
          </div>
        </div>
        <div className="discription">
          <div className="container">
            <p className="details-head">Details</p>
            <h1 className="description-titel">discription</h1>
            <p>
              This is a front to back JavaScript course for absolutely
              everybody. We start with the basic fundamentals and work our way
              to advanced programming WITHOUT relying on frameworks or libraries
              at all. You will learn a ton of pure JavaScript, whether you are a
              beginner or an established JS programmer. There is something for
              everyone...
            </p>
            <h1 className="description-titel">What is Included</h1>
            <p>
              Basics & Fundamentals: Data types, let & const variables,
              functions, conditionals, loops, object literals, arrays, etc DOM
              Manipulation: Selectors, traversing the DOM, show/hide, creating &
              removing elements, event listeners OOP: ES5 prototypes,
              inheritance, ES2015 classes & sub-classes, constructors Async JS:
              Ajax & XHR, Fetch API, callbacks, promises, async / await ES2015+:
              Arrow functions, template strings, generators, iterators, maps &
              sets, symbols & more JavaScript Patterns: Module, Factory, State,
              Observer, Mediator, Singleton Other: Local & session storage,
              regular expressions, try/catch error handling
            </p>
            <h1 className="description-titel">Project</h1>
            <ul className="projects-counter">
              <li>Task List With Local Storage</li>
              <li>Loan Calculator</li>
              <li>Number Guess Game</li>
              <li>
                OOP Book Listing App (ES5 Prototype & ES2015 Classes Version)
              </li>
              <li>Chuck Norris Joke Generator</li>
              <li>
                EasyHTTP - Custom HTTP Library (3 Versions - Callbacks /
                Promises / Async & Await)
              </li>
              <li>Github Finder</li>
              <li>WeatherJS App</li>
              <li>Calorie Tracker (Module Pattern)</li>
              <li>Microposts - Frontend CRUD for REST API (Webpack & Babel)</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default CourseData;
