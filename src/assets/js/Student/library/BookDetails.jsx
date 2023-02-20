import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookDetails(props) {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);

  useEffect(() => {
    // Clone
    let data = props.item;
    // edit
    let ArrData = { ...data };
    // update
    setItem(ArrData);
  }, []);

  return (
    <React.Fragment>
      <div className="book-details">
        <div
          className="container"
          data-aos="fade-right"
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
                  item.volumeInfo?.imageLinks &&
                  item.volumeInfo?.imageLinks.smallThumbnail
                }
                alt=""
              />
            </div>
            <div className="info">
              <h1>{item.volumeInfo?.title}</h1>
              <h3>{item.volumeInfo?.authors}</h3>
              <h4>
                {item.volumeInfo?.publisher}
                <span>{item.volumeInfo?.publishedDate}</span>
              </h4>
              <a href={item.volumeInfo?.previewLink}>
                <button className="btn-shape_2">More</button>
              </a>
            </div>
          </div>
          <div className="right">
            <p>{item.volumeInfo?.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default BookDetails;
