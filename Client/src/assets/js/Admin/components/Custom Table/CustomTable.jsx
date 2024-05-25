import React, { useEffect, useState } from "react";
import Options from "./Options";
import LodingFeachData from "../../../components/Loding Feach Data/LodingFeachData";
import Sort from "../Sort/Sort";
import "./CustomTable.css";

function CustomTable({ Type, ViewData, Serach }) {
  const [DATA, setDATA] = useState([]);
  const [View, SetView] = useState(30);
  const [Order, SetOrder] = useState("ASC");

  useEffect(() => {
    setDATA(ViewData);
  }, [ViewData]);

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
          <Sort SortTable={SortTable} />
          <table>
            <thead>
              <tr>
                {/************ ID **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => SortTable("_id")}
                  />
                  id
                </th>
                {/************ IMAGE **************/}
                <th>image</th>
                {/************  name **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => SortTable("name")}
                  />
                  Name
                </th>
                {/************  National ID **************/}
                <th>
                  <i
                    className="fa-solid fa-sort"
                    onClick={() => SortTable("national_ID")}
                  />
                  National ID
                </th>

                {/************ options **************/}
                <th>options</th>
              </tr>
            </thead>
            {/************ Table body**************/}
            <tbody>
              {DATA.filter((User) => {
                return Serach.toLowerCase() === ""
                  ? User
                  : User.name.toLowerCase().includes(Serach);
              })
                .slice(0, View)
                .map((User, index) => (
                  <tr key={index}>
                    {/************ ID **************/}
                    <td data-label="id">{User._id}</td>
                    {/************ IMAGE **************/}
                    <td data-label="Image">
                      <img src={User.Avatar} alt={User.name} />
                    </td>
                    {/************ name **************/}
                    <td data-label="Name">{User.name}</td>
                    {/************ national ID **************/}
                    <td data-label="national ID">{User.national_ID}</td>

                    {/************ options **************/}
                    <td data-label="options">
                      <div className="Options">
                        <Options View={`/${Type}/${User._id}`} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {DATA.length >= View ? (
            <div className="See-More" onClick={() => SetView(View + 5)}>
              See More
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
