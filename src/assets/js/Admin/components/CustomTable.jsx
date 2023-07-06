import React, { useEffect, useState } from "react";
import axios from "axios";
import Options from "./Options";
import { HandleDelete } from "./CRUD";
import LodingFeachData from "../../components/Loding Feach Data/LodingFeachData";
import Sort from "./Sort/Sort";

function CustomTable(props) {
  const api = props.api;
  const [DATA, setDATA] = useState([]);
  const [View, SetView] = useState(30);
  const [Order, SetOrder] = useState("ASC");

  useEffect(() => {
    axios.get(api).then((reasponse) => setDATA(reasponse.data));
  }, [HandleDelete]);

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

  return (
    <React.Fragment>
      {DATA.length !== 0 ? (
        <div className="CustomTable">
          <Sort
            type={props.type}
            SortTable={SortTable}
            col1={props.col1}
            col2={props.col2}
            col3={props.col3}
          />
          <table>
            <thead>
              <tr>
                {/************ ID **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student"
                          ? "student_id"
                          : props.type === "teacher"
                          ? "doctor_id"
                          : "subject_id"
                      )
                    }
                  ></i>
                  id
                </th>
                {/************ IMAGE **************/}
                <th>image</th>
                {/************ name or course name **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student"
                          ? "student_name"
                          : props.type === "teacher"
                          ? "doctor_name"
                          : "subject_name"
                      )
                    }
                  ></i>
                  {props.col1}
                </th>
                {/************ student_code or subject_description **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student"
                          ? "student_code"
                          : props.type === "teacher"
                          ? "doctor_code"
                          : "subject_description"
                      )
                    }
                  ></i>
                  {props.col2}
                </th>
                {/************ student_nat_id or course generation_id **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() =>
                      SortTable(
                        props.type === "student"
                          ? "student_nat_id"
                          : props.type === "teacher"
                          ? "doctor_pass"
                          : "generation_id"
                      )
                    }
                  ></i>
                  {props.col3}
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
                  ? item.student_name.toLowerCase().includes(props.Serach)
                  : props.type === "teacher"
                  ? item.doctor_name.toLowerCase().includes(props.Serach)
                  : item.subject_name.toLowerCase().includes(props.Serach);
              })
                .slice(0, View)
                .map((p, index) => (
                  <tr key={index}>
                    {/************ ID **************/}
                    <td data-label="id">
                      {props.type === "student"
                        ? p.student_id
                        : props.type === "teacher"
                        ? p.doctor_id
                        : p.subject_id}
                    </td>
                    {/************ IMAGE **************/}
                    <td data-label="image">
                      <img
                        src={require("../../../img/user.png")}
                        alt={
                          props.type === "student"
                            ? p.student_name
                            : props.type === "teacher"
                            ? p.doctor_id
                            : p.id
                        }
                      />
                    </td>
                    {/************ name or course name **************/}
                    <td data-label={props.col1}>
                      {props.type === "student"
                        ? p.student_name
                        : props.type === "teacher"
                        ? p.doctor_name
                        : p.subject_name}
                    </td>
                    {/************ code or subject_description **************/}
                    <td data-label={props.col2}>
                      {props.type === "student" ? (
                        p.student_code
                      ) : props.type === "teacher" ? (
                        p.doctor_code
                      ) : (
                        <p>{p.subject_description.slice(0, 20)}...</p>
                      )}
                    </td>
                    {/************ student_nat_id or course generation_id **************/}
                    <td data-label={props.col3}>
                      {props.type === "student"
                        ? p.student_nat_id
                        : props.type === "teacher"
                        ? p.doctor_pass
                        : p.generation_id}
                    </td>

                    {/************ options **************/}
                    <td data-label="options">
                      <div className="Options">
                        <Options
                          View={`/${props.type}/${
                            props.type === "student"
                              ? p.student_id
                              : props.type === "teacher"
                              ? p.doctor_id
                              : p.subject_id
                          }`}
                          HandleDelete={() =>
                            HandleDelete(props.api_Delete, p.id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {DATA.length >= View ? (
            <div className="See-More">
              <button onClick={() => SetView(View + 5)}>See More</button>
            </div>
          ) : null}
        </div>
      ) : (
        <LodingFeachData />
      )}
    </React.Fragment>
  );
}
export default CustomTable;
