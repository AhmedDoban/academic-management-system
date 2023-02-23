import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentFriends.css";
import LodingFeachData from "../../components/LodingFeachData";

function StudentFriends(props) {
  const [Friends, setFriends] = useState([]);

  async function fetchData() {
    let response = await axios("https://dummyjson.com/users");
    let users = response.data.users;
    setFriends(users);
    console.log(users);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="StudentFriends">
        <div className="container">
          <h1 className="main-titel-2">Student Friends page</h1>

          {Friends.length === 0 ? (
            <LodingFeachData />
          ) : (
            <div className="cards">
              {Friends?.slice(0, 10).map((Fri) => (
                <div class="card">
                  <div class="card-border-top"></div>
                  <img src={Fri.image} alt="" class="img" />
                  <span> {Fri.firstName}</span>
                  <p class="job"> Student</p>
                  <div className="options">
                    <button>
                      <i className="fa-solid fa-phone"></i>
                    </button>
                    <button>
                      <i className="fa-regular fa-comment"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default StudentFriends;
