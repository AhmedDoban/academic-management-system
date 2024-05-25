import React, { useState } from "react";
import Select from "react-select";
import "./Sort.css";

export default function Sort(props) {
  const [value, setValue] = useState("_id");
  const handleChange = (event) => {
    setValue(event);
  };
  const options = [
    {
      value: "_id",
      label: <p className="color-black">Id</p>,
    },
    {
      value: "name",
      label: <p className="color-black">Name</p>,
    },
    {
      value: "national_ID",
      label: <p className="color-black">National ID</p>,
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
