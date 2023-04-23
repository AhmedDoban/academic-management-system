import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import Mountain from "./../../components/Mountain Template/Mountain";
import "./Class.css";
import axios from "axios";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
function Subjects() {
  const [TextFeild, SetTextField] = useState("");
  const [Doctor_id, setDoctor_id] = useState([]);

  const GetID = async function () {
    try {
      const response = await JSON.parse(localStorage.getItem("User"));
      setDoctor_id(response.doctor_id);
    } catch (error) {
      throw error;
    }
  };

  const [Classes, SetClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    "https://camp-coding.tech/fci_project/graduation/doctor/select_doctor_sub.php";

  useEffect(() => {
    const fetchData = async function () {
      GetID();
      try {
        setLoading(true);
        await axios
          .post(
            url,
            { doctor_id: Doctor_id },
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
  }, [url, Doctor_id]);

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> Class Room</h1>
          <div className="card">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets10.lottiefiles.com/private_files/lf30_jo7huq2d.json"
              style={{ width: "50px", height: "50px" }}
            ></Player>
            <input
              type="text"
              placeholder="Search . . . "
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
            />
          </div>
        </div>
      </Mountain>
      <div className="subjects">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            {Classes.filter((p) =>
              TextFeild.toLowerCase() !== ""
                ? p.subject_name.toLowerCase().includes(TextFeild)
                : p.subject_name
            ).map((p) => (
              <Link
                className="card"
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
                to={`/subjects/${p.subject_id}/${p.subject_name}?`}
                key={p.subject_id}
              >
                <h1>{p.subject_name}</h1>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src="https://assets7.lottiefiles.com/packages/lf20_yg29hewu.json"
                  style={{ width: "100px", height: "150px" }}
                ></Player>
              </Link>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Subjects;
