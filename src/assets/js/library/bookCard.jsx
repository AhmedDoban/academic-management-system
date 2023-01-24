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
              {/* <div
                className="card"
                onClick={() => {
                  setShow(true);
                  setItem(p);
                }}
              >
                <img
                  src={
                    p.volumeInfo.imageLinks &&
                    p.volumeInfo.imageLinks.smallThumbnail
                  }
                  alt={p.volumeInfo.title}
                />
                <div className="bottom-card">
                  <h1>{p.volumeInfo.title}</h1>
                  <p>
                    <span>&#x24;</span>
                    {p.saleInfo.listPrice && p.saleInfo.listPrice.amount}
                  </p>
                </div>
              </div> */}
              <div
                class="book"
                onClick={() => {
                  setShow(true);
                  setItem(p);
                }}
              >
                <div class="front">
                  <div class="cover">
                    <img
                      src={
                        p.volumeInfo.imageLinks &&
                        p.volumeInfo.imageLinks.smallThumbnail
                      }
                      alt={p.volumeInfo.title}
                    />
                  </div>
                </div>
                <div class="left-side">
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
