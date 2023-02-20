import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookDetails() {
  let params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState([]);

  const getData = (e) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${params.id}&key=AIzaSyB1kPV9WkbAyngXClEvg3BBXN6ahnD-Nag&maxResults=1`
      )
      .then((response) => {
        setItem(response.data.items);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      {item.map((p) => (
        <div className="book-details">
          <div
            className="container"
            data-aos="fade-down"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => navigate(-1)}
            ></i>
            <div className="left">
              <div className="img-container">
                <img
                  src={
                    p.volumeInfo.imageLinks &&
                    p.volumeInfo.imageLinks.smallThumbnail
                  }
                  alt=""
                />
              </div>
              <div className="info">
                <h1>{p.volumeInfo.title}</h1>
                <h3>{p.volumeInfo.authors}</h3>
                <h4>
                  {p.volumeInfo.publisher}
                  <span>{p.volumeInfo.publishedDate}</span>
                </h4>
                <a href={p.volumeInfo.previewLink}>
                  <button className="btn-shape_2">More</button>
                </a>
              </div>
            </div>
            <div className="right">
              <p>{p.volumeInfo.description}</p>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
export default BookDetails;
