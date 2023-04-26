import React, { useState, useEffect } from "react";
import axios from "axios";

function GetUser(props) {
  const [user, SetUser] = useState("");
  const url =
    "https://fci-project1231.000webhostapp.com/fci_project/select_profile_info.php";

  useEffect(() => {
    const GetUSerData = async () => {
      try {
        await axios
          .post(
            url,
            { student_id: props.student_id + 1 },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              SetUser(response.data.message.student_name);
            }
          });
      } catch (error) {
        throw error;
      }
    };
    GetUSerData();
  }, [url]);

  return (
    <React.Fragment>
      <p>{user}</p>
    </React.Fragment>
  );
}
export default GetUser;
