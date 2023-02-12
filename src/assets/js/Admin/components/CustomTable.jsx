import React, { useEffect, useState } from "react";
import axios from "axios";
import Options from "./Options";
import { HandleDelete } from "./CRUD";
function CustomTable(props) {
  const api = props.api;
  const [DATA, setDATA] = useState([]);
  const [View, SetView] = useState(10);
  useEffect(() => {
    axios.get(api).then((reasponse) => setDATA(reasponse.data));
  }, []);

  return (
    <React.Fragment>
      {DATA.length !== 0 ? (
        <div className="CustomTable">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th> {props.col1}</th>
                <th>{props.col2}</th>
                <th>{props.col3}</th>
                <th>options</th>
              </tr>
            </thead>
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
                    <td data-label="id">{p.id}</td>
                    <td data-label="image">
                      <img
                        src={p.profilePicture}
                        alt={
                          props.type === "student" ? p.firstName : p.CourcesName
                        }
                      />
                    </td>
                    <td data-label={props.col1}>
                      {props.type === "student" ? p.firstName : p.CourcesName}
                    </td>
                    <td data-label={props.col2}>
                      {props.type === "student" ? p.lastName : p.CourcesTeacher}
                    </td>
                    <td data-label={props.col3}>
                      {props.type === "student" ? p.phone : p.CourcesTeacher}
                    </td>
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
        <div className="Loding-feachData">
          <span>Loading</span>
        </div>
      )}
    </React.Fragment>
  );
}
export default CustomTable;
