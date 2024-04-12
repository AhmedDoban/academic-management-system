import React, { useState, useEffect, useRef } from "react";
import "./StudentTodo.css";
import Toast_Handelar from "../../components/Toast_Handelar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import {
  AddNewTodo,
  CUD_StudentTodo,
  DeleteTodo,
  GetTodos,
  HandleDeleteMany,
  HandleDrag,
  HandleFilterTodos,
  HandleSelectAll,
  SelectAll,
  SelectOne,
  UpdateTodo,
} from "../../../Toolkit/Slices/TodosSlice";

function StudentTodo() {
  const Dispatch = useDispatch();
  const dragItem = useRef();
  const dragOverItem = useRef();

  const { Todos, loading, CheckAll, Selected, AllTodos } = useSelector(
    (state) => state.Todos
  );
  const [TextFeild, SetTextField] = useState("");

  useEffect(() => {
    Dispatch(GetTodos());
    //eslint-disable-next-line
  }, []);

  // Filter data depend on select
  const handelFilter = (e, state) => {
    const btn = document.querySelectorAll(".Btn-Filter-todo");
    btn.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    Dispatch(HandleFilterTodos(state));
    Dispatch(HandleSelectAll());
  };

  // Set data to be compleated
  const handelCompleated = (TodoItem) => {
    Dispatch(UpdateTodo({ ...TodoItem, Status: !TodoItem.Status }));
    Dispatch(CUD_StudentTodo());
  };

  //Filter data and delete not match
  const HandleDelete = (_id) => {
    Dispatch(DeleteTodo({ _id }));
    Dispatch(CUD_StudentTodo());
  };

  const HandleDeleteManyBtn = () => {
    Dispatch(HandleDeleteMany());
    Dispatch(CUD_StudentTodo());
  };

  // button add data depend on input
  const HandleTextFeild = () => {
    if (TextFeild) {
      Dispatch(AddNewTodo({ Title: TextFeild }));
      Dispatch(CUD_StudentTodo());
      SetTextField("");
    } else {
      Toast_Handelar("error", "You must enter some todo data !");
    }
  };

  // add data depend on input with enter key
  const TextBox = (e) => {
    if (e.key === "Enter") {
      HandleTextFeild();
    }
  };

  // check all input function
  const HandleCheckALl = () => {
    Dispatch(SelectAll());
    Dispatch(CUD_StudentTodo());
  };

  // rearange the data with drag and drop
  const dragStart = (position) => {
    dragItem.current = position;
  };

  const dragEnter = (position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...Todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    Dispatch(HandleDrag(copyListItems));
    Dispatch(CUD_StudentTodo());
  };

  return (
    <React.Fragment>
      <div className="STudent-Todo-list">
        <div className="container">
          <div className="data">
            <h1>Todo</h1>
          </div>
          {/***************** input data from user **********************/}
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
          {/***************** option for user **********************/}
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
                {AllTodos.filter((p) => p.Status === false).length} Todos left
              </p>
            </div>
            <div className="info">
              <button
                className="Btn-Filter-todo active"
                onClick={(e) => handelFilter(e, "ALL")}
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
              <button onClick={() => HandleDeleteManyBtn()}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          {/***************** Show todo data **********************/}
          {loading ? (
            <Loading />
          ) : (
            Todos.map((Todoitem, index) => (
              <div
                data-aos="fade-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                className="card draggable"
                onDragStart={() => dragStart(index)}
                onDragEnter={() => dragEnter(index)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={drop}
                draggable
                key={Todoitem._id}
              >
                <i className="fa-solid fa-grip " />
                <div className="box">
                  <input
                    type="checkbox"
                    id={index}
                    checked={Selected.includes(Todoitem._id)}
                    onChange={() => Dispatch(SelectOne(Todoitem._id))}
                  />
                  <label htmlFor={index}>{Todoitem.Title}</label>
                </div>
                <div className="actions">
                  <i
                    className="fa-solid fa-xmark HandleDelete"
                    onClick={() => HandleDelete(Todoitem._id)}
                  />
                  <i
                    onClick={() => handelCompleated(Todoitem)}
                    className={
                      Todoitem.Status
                        ? "fa-solid fa-check CompleatedTodo"
                        : "fa-solid fa-check"
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default StudentTodo;
