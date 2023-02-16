import React, { useState, useEffect, useRef } from "react";
import "./StudentTodo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function StudentTodo() {
  const [TextFeild, SetTextField] = useState("");

  const [Todo, setTodo] = useState(() => {
    const SavedTodos = localStorage.getItem("StudentTodos");
    if (SavedTodos) {
      return JSON.parse(SavedTodos);
    } else {
      return [];
    }
  });

  const [ViewedTodo, SetViewTodo] = useState([]);

  useEffect(() => {
    localStorage.setItem("StudentTodos", JSON.stringify(Todo));
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
  const HandleDelete = (e, Out_index) => {
    setTodo(Todo.filter((p, index) => index !== Out_index));
  };

  const HandleTextFeild = () => {
    if (TextFeild) {
      // Clone
      let Data = [...Todo];
      // Edit
      Data.push({ TodoText: TextFeild, IsCompleated: false });
      // update
      setTodo([...Data]);
    } else {
      toast.error("You must Enter Some Todo", {
        autoClose: 15000,
        theme: "colored",
      });
    }
    SetTextField("");
  };
  const TextBox = (e) => {
    if (e.key === "Enter") {
      HandleTextFeild();
    }
  };

  const [CheckAll, SetChekALl] = useState(false);
  const HandleCheckALl = () => {
    if (!CheckAll) {
      let Data = [...Todo];
      Data.map((p) => (p.IsCompleated = true));
      setTodo(Data);
      SetChekALl(true);
    } else {
      let Data = [...Todo];
      Data.map((p) => (p.IsCompleated = false));
      setTodo(Data);
      SetChekALl(false);
    }
  };

  const dragItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragOverItem = useRef();
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const drop = (e) => {
    const copyListItems = [...Todo];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodo(copyListItems);
  };

  return (
    <React.Fragment>
      <div className="STudent-Todo-list">
        <div className="container">
          <div className="data">
            <h1>Todo</h1>
          </div>
          <div className="card">
            <i className="fa-solid fa-plus" onClick={HandleTextFeild}></i>
            <input
              type="text"
              placeholder="Creacte a new todo"
              value={TextFeild}
              onChange={(e) => SetTextField(e.target.value)}
              onKeyPress={TextBox}
            />
          </div>
          <div className="card">
            <div className="box checkAll">
              <input
                type="checkbox"
                id="ALLFIELDS"
                onChange={() => HandleCheckALl()}
                checked={CheckAll}
              />
              <label htmlFor="ALLFIELDS">Select All</label>
            </div>
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
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          {ViewedTodo.map((p, index) => (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              className="card draggable"
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              key={index}
              draggable
            >
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
                onClick={(e) => HandleDelete(e, index)}
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
