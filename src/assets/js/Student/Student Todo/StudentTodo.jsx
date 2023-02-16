import React from "react";
import "./StudentTodo.css";
function StudentTodo() {
  return (
    <React.Fragment>
      <div className="STudent-Todo-list">
        <div className="container">
          <div className="data">
            <h1>Todo</h1>
          </div>
          <div className="card">
            <i className="fa-solid fa-plus"></i>
            <input type="text" placeholder="Creacte a new todo" />
          </div>
          <div className="card">
            <div className="info">
              <p>0 items left</p>
            </div>
            <div className="info">
              <button className="active">All</button>
              <button>Active</button>
              <button>Compleated</button>
            </div>
            <div className="info">
              <button>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StudentTodo;
