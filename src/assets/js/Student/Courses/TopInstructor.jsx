import React from "react";
import { useState, useEffect } from "react";
import { Users } from "../../../../dummyData";
function Top_Instructor(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  return (
    <React.Fragment>
      <div className="top_instructor">
        <h1
          className="top_instructor_header"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          Top Instructor
        </h1>
        <div
          className="container"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          {Users.filter((p) => p.rate >= 4)
            .slice(0, 4)
            .map((p) => (
              <div className="card">
                <div className="card-img">
                  <img src={p.profilePicture} alt="" />
                </div>
                <div className="stars">
                  <p>
                    {p.rate >= 5 ? (
                      <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </div>
                    ) : (
                      <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                    )}
                  </p>
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
