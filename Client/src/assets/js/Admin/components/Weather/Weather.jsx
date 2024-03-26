import React, { useState, useEffect } from "react";
import axios from "axios";
import "./wether.css";
import Mountain from "./../../../components/Mountain Template/Mountain";
import { Link, NavLink, Navigate } from "react-router-dom";
function Weather() {
  const [data, SetData] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  let api = "https://api.openweathermap.org/data/2.5";
  let apiWeatherkey = "118d349a7305ac6c68aabac02ca9c657";

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await axios
        .get(
          `${api}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${apiWeatherkey}`
        )
        .then((result) => {
          SetData(result.data);
        });
    };
    fetchData();
  }, [lat, long]);

  const [Theme, SetTheme] = useState(localStorage.getItem("theme") || "light");
  const [Chek, SetChek] = useState(false);
  const [Localtitle, SetLocaltitle] = useState("Students");
  const toggleTheme = () => {
    Theme === "light" ? SetTheme("dark") : SetTheme("light");
  };
  const HandleThemeChange = () => {
    SetChek(!Chek);
    toggleTheme();
  };
  useEffect(() => {
    localStorage.setItem("theme", Theme);
    Theme === "light" ? SetChek(false) : SetChek(true);
    CheckCurrentTheme();
  }, [Theme]);

  const CheckCurrentTheme = () => {
    let Root = document.documentElement.style;
    if (Theme === "light") {
      Root.setProperty("--main-background-color", "#f1f5f9");
      Root.setProperty("--main-page-color", "#1b575b");
      Root.setProperty("--white-color", "#fff");
      Root.setProperty("--black-color", "#000");
      Root.setProperty("--main-p-color", "#777");
    } else {
      Root.setProperty("--main-background-color", "#121212");
      Root.setProperty("--main-page-color", "#121212  ");
      Root.setProperty("--white-color", "#1e1e1e");
      Root.setProperty("--black-color", "#fff");
      Root.setProperty("--main-p-color", "#fff");
    }
  };
  const logOut = () => {
    localStorage.clear();
    Navigate("/");
    window.location.reload(true);
  };
  return (
    <React.Fragment>
      <div className="weather">
        <Mountain>
          <div className="data">
            {typeof data.main != "undefined" ? (
              <div className="weather-data">
                <h1>{data.name}</h1>
                <div className="temp">
                  <p>{data.main.temp.toFixed(0)}&#176;c</p>
                  <img
                    src={require(`../../../../img/Weaher/${data.weather[0].icon}.png`)}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="loading">
                <h1>Loading .....</h1>
              </div>
            )}

            <div className="contentData">
              <label htmlFor="Theme" className="ThemeMountain">
                <input
                  type="checkbox"
                  name="Theme"
                  id="Theme"
                  onChange={HandleThemeChange}
                  checked={Chek}
                />
                <span></span>
              </label>
              <ul>
                <li>
                  <NavLink to="/" onClick={() => SetLocaltitle("/home")} end>
                    <i className="fa-solid fa-house"></i>
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Student"
                    onClick={() => SetLocaltitle("Students")}
                    end
                  >
                    <i className="fa-solid fa-users"></i>
                    <span>Students</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/teacher"
                    onClick={() => SetLocaltitle("Instractor")}
                    end
                  >
                    <i className="fa-solid fa-chalkboard-user"></i>
                    <span>Instractors</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Classes"
                    onClick={() => SetLocaltitle("Class")}
                    end
                  >
                    <i className="fa-solid fa-database"></i>
                    <span>Classes</span>
                  </NavLink>
                </li>
                <li>
                  <Link onClick={logOut} to="/">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>log-out </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Mountain>
      </div>
    </React.Fragment>
  );
}
export default Weather;
