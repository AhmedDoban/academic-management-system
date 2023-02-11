import React, { useEffect, useState } from "react";
import axios from "axios";
import Options from "../components/Options";
import Swal from "sweetalert2";

function CustomTable(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    axios.get(props.api).then((response) => {
      setItems(response.data);
    });
  };

  const HandleDelete = (target) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't Delete this Record `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${props.api}/${target.id}`).then(GetData());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="CustomTable">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Cource Teacher</th>
              <th>Cource Name</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td data-label="id">{p.id}</td>
                <td data-label="Cource Teacher">{p.CourcesTeacher}</td>
                <td data-label="Cource Name">{p.CourcesName}</td>
                <td data-label="options">
                  <div className="Options">
                    <Options
                      View={`/courses/${p.id}`}
                      HandleDelete={() => HandleDelete(p)}
                      Edit={`/courses/edit/${p.id}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
export default CustomTable;
