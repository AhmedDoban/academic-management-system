import React, { useEffect, useState } from "react";
import axios from "axios";
import Options from "./Options";
import { HandleDelete } from "./CRUD";
import LodingFeachData from "./../../components/LodingFeachData";
function CustomTable(props) {
  const api = props.api;
  const [DATA, setDATA] = useState([]);
  const [View, SetView] = useState(30);
  const [Order, SetOrder] = useState("ASC");

  useEffect(() => {
    axios.get(api).then((reasponse) => setDATA(reasponse.data));
  }, []);

  // Sort Table
  const SortTable = (col) => {
    if (Order === "ASC") {
      const Sorted = [...DATA].sort((a, b) => {
        if (typeof b[col] === "string" && typeof a[col] === "string") {
          return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
        } else return a[col] > b[col] ? 1 : -1;
      });
      setDATA(Sorted);
      SetOrder("DES");
    }
    if (Order === "DES") {
      const Sorted = [...DATA].sort((a, b) => {
        if (typeof b[col] === "string" && typeof a[col] === "string") {
          return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        } else return a[col] < b[col] ? 1 : -1;
      });
      setDATA(Sorted);
      SetOrder("ASC");
    }
  };
  const [value, setValue] = React.useState("id");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      {DATA.length !== 0 ? (
        <div className="CustomTable">
          <div className="sort-table">
            <select onChange={handleChange}>
              {/************ ID **************/}
              <option value="ID">ID</option>
              {/************ First name or course name **************/}
              <option
                value={props.type === "student" ? "firstName" : "CourcesName"}
              >
                {props.col1}
              </option>
              {/************ last name or course Teacher **************/}
              <option
                value={props.type === "student" ? "lastName" : "CourcesTeacher"}
              >
                {props.col2}
              </option>
              {/************ Phone or course teacher **************/}
              <option
                value={props.type === "student" ? "phone" : "CourcesTeacher"}
              >
                {props.col3}
              </option>
              {/************ GPA **************/}
              <option
                value={props.type === "student" ? "gpa" : "CourcesTeacher"}
              >
                {props.col4}
              </option>
              {/************ Gender **************/}
              <option
                value={props.type === "student" ? "gender" : "CourcesTeacher"}
              >
                {props.col5}
              </option>
            </select>
            <i
              className="fa-solid fa-sort"
              onClick={() => SortTable(value)}
            ></i>
          </div>
          <table>
            <thead>
              <tr>
                {/************ ID **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => SortTable("id")}
                  ></i>
                  id
                </th>
                {/************ IMAGE **************/}
                <th>image</th>
                {/************ First name or course name **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student" ? "firstName" : "CourcesName"
                      )
                    }
                  ></i>
                  {props.col1}
                </th>
                {/************ last name or course Teacher **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student" ? "lastName" : "CourcesTeacher"
                      )
                    }
                  ></i>
                  {props.col2}
                </th>
                {/************ Phone or course teacher **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student" ? "phone" : "CourcesTeacher"
                      )
                    }
                  ></i>
                  {props.col3}
                </th>
                {/************ GPA **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student" ? "gpa" : "CourcesTeacher"
                      )
                    }
                  ></i>
                  {props.col4}
                </th>
                {/************ Gender **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student" ? "gender" : "CourcesTeacher"
                      )
                    }
                  ></i>
                  {props.col5}
                </th>
                {/************ options **************/}
                <th>options</th>
              </tr>
            </thead>
            {/************ Table body**************/}
            <tbody>
              {DATA.filter((item) => {
                return props.Serach.toLowerCase() === ""
                  ? item
                  : props.type === "student"
                  ? item.firstName.toLowerCase().includes(props.Serach)
                  : item.CourcesName.toLowerCase().includes(props.Serach);
              })
                .slice(0, View)

                .map((p) => (
                  <tr key={p.id}>
                    {/************ ID **************/}
                    <td data-label="id">{p.id}</td>
                    {/************ IMAGE **************/}
                    <td data-label="image">
                      <img
                        src={p.profilePicture}
                        alt={
                          props.type === "student" ? p.firstName : p.CourcesName
                        }
                      />
                    </td>
                    {/************ First name or course name **************/}
                    <td data-label={props.col1}>
                      {props.type === "student" ? p.firstName : p.CourcesName}
                    </td>
                    {/************ last name or course Teacher **************/}
                    <td data-label={props.col2}>
                      {props.type === "student" ? p.lastName : p.CourcesTeacher}
                    </td>
                    {/************ Phone or course teacher **************/}
                    <td data-label={props.col3}>
                      {props.type === "student" ? p.phone : p.CourcesTeacher}
                    </td>
                    {/************ GPA **************/}
                    <td data-label={props.col4}>
                      {props.type === "student" ? p.gpa : p.CourcesTeacher}
                    </td>
                    {/************ Gender **************/}
                    <td data-label={props.col4}>
                      {props.type === "student" ? p.gender : p.CourcesTeacher}
                    </td>
                    {/************ options **************/}
                    <td data-label="options">
                      <div className="Options">
                        <Options
                          View={`/${props.type}/${p.id}`}
                          HandleDelete={() => HandleDelete(api, p.id)}
                          Edit={`/${props.type}/edit/${p.id}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {DATA.length >= View ? (
            <input
              type="button"
              onClick={() => SetView(View + 5)}
              value="See More"
              className="See-More"
            />
          ) : null}
        </div>
      ) : (
        <LodingFeachData />
      )}
    </React.Fragment>
  );
}
export default CustomTable;
