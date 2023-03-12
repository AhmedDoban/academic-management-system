import React, { useState, useEffect } from "react";
import axios from "axios";
import "./wether.css";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
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
          console.log(result.data);
        });
    };
    fetchData();
  }, [lat, long]);

  console.log(data);
  return (
    <React.Fragment>
      {typeof data.main != "undefined" ? (
        <div className="weather" data-aos="zoom-in">
          <div className="data blue-alt-back">
            <h1>{data.name}</h1>
            <p>{data.main.temp.toFixed(0)}&#176;c</p>
            <img
              src={require(`../../../../img/Weaher/${data.weather[0].icon}.png`)}
              alt=""
            />
          </div>
        </div>
      ) : (
        <LodingFeachData />
      )}
    </React.Fragment>
  );
}
export default Weather;
