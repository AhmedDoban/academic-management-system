import React, { useState, useEffect } from "react";
import "./StudentTodo.css";
import { ToastContainer, toast } from "react-toastify";
function StudentTodo() {
  const [TextFeild, SetTextField] = useState("");

  const [Todo, setTodo] = useState([
    { TodoText: "Some", IsCompleated: false },
    { TodoText: "Some", IsCompleated: true },
    { TodoText: "Some", IsCompleated: false },
    { TodoText: "Some", IsCompleated: true },
    { TodoText: "Some", IsCompleated: false },
    { TodoText: "Some", IsCompleated: false },
    { TodoText: "Some", IsCompleated: false },
  ]);

  const [ViewedTodo, SetViewTodo] = useState([]);

  useEffect(() => {
    SetViewTodo([...Todo]);
  }, [Todo]);

  const handelFilter = (e, state) => {
    const btn = document.querySelectorAll(".Btn-Filter-todo");
    btn.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    let Data = [...Todo];
    state === "All"
      ? SetViewTodo(Data)
      : state === true
      ? SetViewTodo(Data.filter((p) => p.IsCompleated === true))
      : SetViewTodo(Data.filter((p) => p.IsCompleated === false));
  };
  const handelCompleated = (p) => {
    p.IsCompleated = !p.IsCompleated;
    let Data = [...ViewedTodo];
    setTodo([...Data]);
  };
  const HandleDelete = (Out_index) => {
    setTodo(Todo.filter((p, index) => index !== Out_index));
  };

  const TextBox = (e) => {
    console.log(TextFeild);
    if (e.key === "Enter") {
      if (TextFeild) {
        // Clone
        let Data = [...Todo];
        // Edit
        Data.push({ TodoText: TextFeild, IsCompleated: false });
        // update
        setTodo([...Data]);
      } else {
        toast.error("You Must Enter Book Name", {
          autoClose: 15000,
          theme: "colored",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="STudent-Todo-list">
        <div className="container">
          <div className="data">
            <h1>Todo</h1>
          </div>
          <div className="card">
            <i className="fa-solid fa-plus"></i>
            <input
              type="text"
              placeholder="Creacte a new todo"
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
              onKeyPress={TextBox}
            />
          </div>
          <div className="card">
            <div className="info">
              <p>
                {Todo.filter((p) => p.IsCompleated === false).length} items left
              </p>
            </div>
            <div className="info">
              <button
                className="Btn-Filter-todo active"
                onClick={(e) => handelFilter(e, "All")}
              >
                All
              </button>
              <button
                className="Btn-Filter-todo"
                onClick={(e) => handelFilter(e, false)}
              >
                Active
              </button>
              <button
                className="Btn-Filter-todo"
                onClick={(e) => handelFilter(e, true)}
              >
                Compleated
              </button>
            </div>
            <div className="info">
              <button
                onClick={(e) =>
                  setTodo(Todo.filter((p) => p.IsCompleated === false))
                }
              >
                Clear completed
              </button>
            </div>
          </div>
          {ViewedTodo.map((p, index) => (
            <div className="card" key={index}>
              <div className="box">
                <input
                  type="checkbox"
                  id={index}
                  checked={p.IsCompleated}
                  onChange={() => handelCompleated(p)}
                />
                <label htmlFor={index}>{p.TodoText}</label>
              </div>
              <i
                className="fa-solid fa-xmark HandleDelete"
                onClick={() => HandleDelete(index)}
              ></i>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}

export default StudentTodo;
