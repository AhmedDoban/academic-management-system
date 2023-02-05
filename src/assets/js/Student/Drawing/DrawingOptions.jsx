import React from "react";

function DrawingOptions(props) {
  const open = () => {
    const DrawingOptions = document.querySelector(".DrawingOptions");
    const icon_container = document.querySelector(".DrawingOptions i");
    DrawingOptions.classList.toggle("active");
    icon_container.classList.toggle("fa-spin");
  };
  return (
    <React.Fragment>
      <div className="DrawingOptions">
        <div class="icon-container" onClick={open}>
          <i class="fas fa-gear"></i>
        </div>
        <div className="input-box-options">
          <input
            type="color"
            id="color"
            name="color"
            value={props.color}
            onChange={(e) => props.setColor(e.target.value)}
          />
          <label htmlFor="color" style={{ backgroundColor: props.color }}>
            Color
          </label>
        </div>
        <div className="input-box-options">
          <label htmlFor="size">size</label>
          <input
            type="range"
            id="size"
            name="size"
            min="5"
            max="50"
            step="1"
            value={props.size}
            onChange={(e) => props.setSize(e.target.value)}
          />
        </div>
        <div className="input-box-options">
          <button onClick={props.Erasing}>
            <i className="fa-solid fa-eraser"></i> <span>Eraser</span>
          </button>
          <button onClick={props.DrawingAgin}>
            <i className="fa-solid fa-paintbrush"></i>
            <span>Draw</span>
          </button>
          <button onClick={props.handleClear}>
            <i class="fa-solid fa-chalkboard"></i>
            <span>Clear</span>
          </button>
          <a
            download="image.png"
            onClick={props.handleDownload}
            href={props.dateUrl}
          >
            <i class="fa-solid fa-cloud-arrow-down"></i>
            <span>Downlad Img</span>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}
export default DrawingOptions;
