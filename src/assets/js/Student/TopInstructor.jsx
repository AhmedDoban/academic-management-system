import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Users } from "../../../dummyData";
function Top_Instructor(props) {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  const stars = (count) => {
    if (count >= 5) {
      return (
        <div>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
      );
    } else {
      return (
        <div>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
      );
    }
  };
  return (
    <React.Fragment>
      <div className="top_instructor">
        <h1 className="top_instructor_header">Top Instructor</h1>
        <div className="container">
          {Users.filter((p) => p.rate >= 4)
            .slice(0, 4)
            .map((p) => (
              <div className="card">
                <div className="card-img">
                  <img src={p.profilePicture} alt="" />
                </div>
                <div className="stars">
                  <p>{stars(p.rate)}</p>
                </div>
                <p>{p.username}</p>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Top_Instructor;
