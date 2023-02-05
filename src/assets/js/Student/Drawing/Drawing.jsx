import React, { useRef, useEffect, useState, useCallback } from "react";
import "./drawing.css";
import DrawingOptions from "./DrawingOptions";

function Drawing() {
  // ref like id => document.getelementbyid("#")
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  // to see if it drawing or not
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(10);

  // to get url to downlad it by button
  const [dateUrl, setDataUrl] = useState("#");

  // useeffect by call it one time
  useEffect(() => {
    // to reduce every one use the convas by canvasRef.current i use it by saveing it in object
    const canvas = canvasRef.current;
    // set the width and the height of the convas i can set it by css
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    // create covas data
    const context = canvas.getContext("2d");
    // and all of the data save it in the contextRef because i use it in the function of drawing
    contextRef.current = context;
  }, [canvasRef]);
  // line  style of the draw
  const StyleConvas = () => {
    contextRef.current.lineCap = "round";
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = size;
  };
  // when start drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    StyleConvas();
    setIsDrawing(true);
  };
  // when start drawing on mobile
  const [ToushX, SetTouchX] = useState();
  const [ToushY, SetTouchY] = useState();
  const touchstart = (e) => {
    SetTouchX(e.changedTouches[0].pageX);
    SetTouchY(e.changedTouches[0].pageY);
    contextRef.current.moveTo(ToushX, ToushY);
    StyleConvas();
    setIsDrawing(true);
  };

  // when finish drawing
  const finishDrowing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  // when drawing on web
  const Drawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  // when drawing on web in mob
  const DrawingMOb = (e) => {
    if (!isDrawing) {
      return;
    }

    let deltaX = e.changedTouches[0].pageX - ToushX;
    let deltaY = e.changedTouches[0].pageY - ToushY;
    contextRef.current.lineTo(deltaX, deltaY);
    contextRef.current.stroke();
  };
  // when Erasing
  const Erasing = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };
  const DrawingAgin = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  // handle Download by set the url of convas
  const handleDownload = useCallback(() => {
    setDataUrl(canvasRef.current.toDataURL("image/png"));
  }, [canvasRef]);

  // handle Clear delete all the data of convas
  const handleClear = useCallback(() => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  }, []);

  return (
    <React.Fragment>
      <div className="drawing">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrowing}
          onMouseMove={Drawing}
          onTouchStart={touchstart}
          onTouchEnd={finishDrowing}
          onTouchMove={DrawingMOb}
          ref={canvasRef}
          className="canvas"
        />
        <DrawingOptions
          handleDownload={handleDownload}
          dateUrl={dateUrl}
          handleClear={handleClear}
          color={color}
          setColor={setColor}
          Erasing={Erasing}
          DrawingAgin={DrawingAgin}
          size={size}
          setSize={setSize}
        />
      </div>
    </React.Fragment>
  );
}
export default Drawing;
