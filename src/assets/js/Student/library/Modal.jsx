import React from "react";
function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="modal">
        <div className="overlay">
          <button onClick={props.onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="data">
            <img
              src={
                props.item.volumeInfo.imageLinks &&
                props.item.volumeInfo.imageLinks.smallThumbnail
              }
              alt=""
            />
            <div className="info">
              <h1>{props.item.volumeInfo.title}</h1>
              <br />
              <h3>{props.item.volumeInfo.authors}</h3>
              <br />
              <h4>
                {props.item.volumeInfo.publisher} {""}
                <span>{props.item.volumeInfo.publishedDate}</span>
              </h4>
              <br />
              <a href={props.item.volumeInfo.previewLink}>
                <button>More</button>
              </a>
            </div>
          </div>
          <div className="description">
            <p>{props.item.volumeInfo.description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Modal;
