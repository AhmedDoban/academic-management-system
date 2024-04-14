import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BookDetails() {
  const navigate = useNavigate();
  const { SingleBook } = useSelector((state) => state.Library);

  useEffect(() => {
    if (Object.keys(SingleBook).length === 0) {
      navigate("/library");
    }
    //eslint-disable-next-line
  }, []);

  const GetFullImgaeSize = (src) => {
    return src.split("&zoom=1").join();
  };

  return (
    <React.Fragment>
      <div className="book-details">
        <div className="container">
          <div className="img-container" data-aos="zoom-in">
            <img
              src={
                SingleBook.volumeInfo?.imageLinks &&
                GetFullImgaeSize(SingleBook.volumeInfo?.imageLinks.thumbnail)
              }
              alt={SingleBook.volumeInfo?.title}
            />
            {SingleBook.volumeInfo?.previewLink && (
              <div className="MoreDetails">
                <a href={SingleBook.volumeInfo?.previewLink}>
                  <button className="btn-shape_2">More Details</button>
                </a>
              </div>
            )}
          </div>
          <div className="information" data-aos="fade-up">
            <div className="info">
              {SingleBook.volumeInfo?.title && (
                <div className="title">
                  <h1>{SingleBook.volumeInfo?.title}</h1>
                  {SingleBook.volumeInfo?.subtitle && (
                    <p>{SingleBook.volumeInfo?.subtitle}</p>
                  )}
                </div>
              )}
              {SingleBook.volumeInfo?.authors && (
                <div className="authors">
                  <h1>Author/s</h1>
                  <ul>
                    {SingleBook.volumeInfo?.authors.map((au) => (
                      <li>
                        <i className="fa-solid fa-user"></i>
                        {au}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {SingleBook.volumeInfo?.publisher && (
                <div className="publisher">
                  <h1>Publisher : </h1>
                  <p>{SingleBook.volumeInfo?.publisher}</p>
                </div>
              )}
              {SingleBook.volumeInfo?.publishedDate && (
                <div className="publishedDate">
                  <h1>Published Date : </h1>
                  <span>{SingleBook.volumeInfo?.publishedDate}</span>
                </div>
              )}
            </div>
            {SingleBook.volumeInfo?.description && (
              <div className="description">
                <h1>Book Description</h1>
                <p>{SingleBook.volumeInfo?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default BookDetails;
