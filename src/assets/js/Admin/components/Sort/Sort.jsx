import React, { useState } from "react";
import Select from "react-select";
import "./Sort.css";

export default function Sort(props) {
  const [value, setValue] = useState("id");
  const handleChange = (event) => {
    setValue(event);
  };
  const options =
    props.type === "student"
      ? [
          {
            value: "ID",
            label: <p className="color-black">Id</p>,
          },
          {
            value: "firstName",
            label: <p className="color-black">{props.col1} </p>,
          },
          {
            value: "lastName",
            label: <p className="color-black">{props.col2}</p>,
          },
          {
            value: "phone",
            label: <p className="color-black">{props.col3}</p>,
          },
        ]
      : props.type === "teacher"
      ? [
          {
            value: "ID",
            label: <p className="color-black">Id</p>,
          },
          {
            value: "firstName",
            label: <p className="color-black">{props.col1} </p>,
          },
          {
            value: "lastName",
            label: <p className="color-black">{props.col2}</p>,
          },
          {
            value: "phone",
            label: <p className="color-black">{props.col3}</p>,
          },
        ]
      : [
          {
            value: "ID",
            label: <p className="color-black">Id</p>,
          },
          {
            value: "CourcesName",
            label: <p className="color-black">{props.col1} </p>,
          },
          {
            value: "CourcesTeacher",
            label: <p className="color-black">{props.col2}</p>,
          },
          {
            value: "CourcesTeacher",
            label: <p className="color-black">{props.col3}</p>,
          },
        ];

  return (
    <React.Fragment>
      <div className="sort-table">
        <div className="sort">
          <Select options={options} onChange={handleChange} />
        </div>
        <i
          className="fa-solid fa-sort"
          onClick={() => props.SortTable(value)}
        />
      </div>
    </React.Fragment>
  );
}
