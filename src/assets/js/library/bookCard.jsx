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
                  alt=""
                />
                <div className="bottom-card">
                  <h1>{p.volumeInfo.title}</h1>
                  <p>
                    <span>&#x24;</span>
                    {p.saleInfo.listPrice && p.saleInfo.listPrice.amount}
                  </p>
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
