import React, { useState } from "react";
import Modal from "./Modal";
function BookCard(props) {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState();
  return (
    <React.Fragment>
      {props.bookData.map((p) => {
        if (
          p.volumeInfo.imageLinks &&
          p.volumeInfo.imageLinks.smallThumbnail !== undefined &&
          p.saleInfo.listPrice &&
          p.saleInfo.listPrice.amount !== undefined
        ) {
          return (
            <>
              <div
                className="book"
                onClick={() => {
                  setShow(true);
                  setItem(p);
                }}
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
              </div>
              <Modal
                show={show}
                item={bookItem}
                onClose={() => setShow(false)}
              />
            </>
          );
        }
      })}
    </React.Fragment>
  );
}
export default BookCard;
