import React, { useState } from "react";
import CardBlur from "./../../../components/Card Blur/CardBlur";
import Blobs from "./../../../components/Blobs/Blobs";
import "./MemoryGame.css";

function MemoryGame() {
  const [items, setItems] = useState(
    [
      { id: 1, className: "fa-brands fa-html5", state: "" },
      { id: 1, className: "fa-brands fa-html5", state: "" },
      { id: 2, className: "fa-brands fa-css3", state: "" },
      { id: 2, className: "fa-brands fa-css3", state: "" },
      { id: 3, className: "fa-brands fa-php", state: "" },
      { id: 3, className: "fa-brands fa-php", state: "" },
      { id: 4, className: "fa-brands fa-react", state: "" },
      { id: 4, className: "fa-brands fa-react", state: "" },
      { id: 5, className: "fa-brands fa-vuejs", state: "" },
      { id: 5, className: "fa-brands fa-vuejs", state: "" },
      { id: 6, className: "fa-brands fa-angular", state: "" },
      { id: 6, className: "fa-brands fa-angular", state: "" },
      { id: 7, className: "fa-brands fa-node", state: "" },
      { id: 7, className: "fa-brands fa-node", state: "" },
      { id: 8, className: "fa-solid fa-brain", state: "" },
      { id: 8, className: "fa-solid fa-brain", state: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, SetPrev] = useState(-1);

  const HandleCheckElle = (current) => {
    if (items[current].id === items[prev].id) {
      items[current].state = "correct";
      items[prev].state = "correct";
      setItems([...items]);
      SetPrev(-1);
    } else {
      SetPrev(-1);
      items[current].state = "wrong";
      items[prev].state = "wrong";
      setTimeout(() => {
        items[current].state = "";
        items[prev].state = "";
        setItems([...items]);
      }, 1000);
    }
  };

  const HandleClick = (id) => {
    if (prev === -1) {
      items[id].state = "active";
      setItems([...items]);
      SetPrev(id);
    } else {
      HandleCheckElle(id);
    }
  };

  const ResetGameHandeler = () => {
    items.map((p) => (p.state = "active"));
    items.sort(() => Math.random() - 0.5);
    setItems([...items]);
    setTimeout(() => {
      items.map((p) => (p.state = ""));
      setItems([...items]);
    }, 3000);
  };
  return (
    <React.Fragment>
      <Blobs />
      <div className="MemoryGame">
        <div className="container">
          <h1 className="main-titel">Memory Game</h1>
          <div className="MemoryGame-container">
            {items.map((item, index) => (
              <CardBlur key={index} active={item.state}>
                <div className="front" onClick={() => HandleClick(index)}></div>
                <div className="back">
                  <i className={item.className}></i>
                </div>
              </CardBlur>
            ))}
          </div>
          <input
            type="button"
            value="Reset Game"
            className="Reset-Game"
            onClick={ResetGameHandeler}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default MemoryGame;
