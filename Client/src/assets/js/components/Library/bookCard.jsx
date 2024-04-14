import React from "react";
import { Link } from "react-router-dom";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import { useSelector, useDispatch } from "react-redux";
import { getSingleBook } from "../../../Toolkit/Slices/LibrarySlice.js";

function BookCard() {
  const Dispatch = useDispatch();
  const { Books, loading } = useSelector((state) => state.Library);

  return (
    <React.Fragment>
      <div className="books">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container" data-aos="fade-down">
            {Books.map((Book) => {
              if (
                Book.volumeInfo.imageLinks &&
                Book.volumeInfo.imageLinks.smallThumbnail !== undefined &&
                Book.saleInfo.listPrice &&
                Book.saleInfo.listPrice.amount !== undefined
              ) {
                return (
                  <Link
                    to={Book.volumeInfo.title}
                    className="book"
                    key={Book.id}
                    onClick={() => Dispatch(getSingleBook(Book))}
                  >
                    <div className="front">
                      <div className="cover">
                        <img
                          src={
                            Book.volumeInfo.imageLinks &&
                            Book.volumeInfo.imageLinks.smallThumbnail
                          }
                          alt={Book.volumeInfo.title}
                        />
                      </div>
                    </div>
                    <div className="left-side">
                      <h2>
                        <span>{Book.volumeInfo.title}</span>
                      </h2>
                    </div>
                  </Link>
                );
              } else return null;
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default BookCard;
