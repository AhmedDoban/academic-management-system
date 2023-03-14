import React from "react";
import { Link } from "react-router-dom";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";

function BookCard(props) {
  return (
    <React.Fragment>
      <div className="books">
        <div
          className="container"
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="1000"
        >
          {props.bookData.length > 0 ? (
            props.bookData.map((p) => {
              if (
                p.volumeInfo.imageLinks &&
                p.volumeInfo.imageLinks.smallThumbnail !== undefined &&
                p.saleInfo.listPrice &&
                p.saleInfo.listPrice.amount !== undefined
              ) {
                return (
                  <>
                    <Link
                      to={p.volumeInfo.title}
                      className="book"
                      onClick={() => props.setItem(p)}
                    >
                      <div className="front">
                        <div className="cover">
                          <img
                            src={
                              p.volumeInfo.imageLinks &&
                              p.volumeInfo.imageLinks.smallThumbnail
                            }
                            alt={p.volumeInfo.title}
                          />
                        </div>
                      </div>
                      <div className="left-side">
                        <h2>
                          <span>{p.volumeInfo.title}</span>
                        </h2>
                      </div>
                    </Link>
                  </>
                );
              }
            })
          ) : (
            <LodingFeachData />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default BookCard;
