import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddNewStudent() {
  let Navigate = useNavigate();
  const [profilePicture, SetprofilePicture] = useState();

  const handleFileSelected = (e) => {
    let image = document.getElementById("Img");
    image.src = URL.createObjectURL(e.target.files[0]);
    SetprofilePicture(image.src);
  };

  return (
    <React.Fragment>
      <div className="add-new-student">
        <h5 className="main-titel-2">Add New Student</h5>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
export default AddNewStudent;
