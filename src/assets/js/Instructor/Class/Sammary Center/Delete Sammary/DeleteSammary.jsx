import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./DeleteSammary.css";

function DeleteSammary() {
  const params = useParams();
  const [Summary, SetSummary] = useState([]);
  const url = `${process.env.REACT_APP_API}/select_summary.php`;

  const fetchData = async function () {
    try {
      await axios
        .post(
          url,
          { subject_id: params.subject_id },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "text/plain",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            SetSummary(response.data.message);
          }
        });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const HandleDeleteSammary = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Delete ${data.summary_name} ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: '<i class="fa-solid fa-check"></i>',
      cancelButtonText: '<i class="fas fa-times"></i>',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(
              `${process.env.REACT_APP_API}/doctor/delete_summary.php`,
              { summary_id: data.summary_id, subject_id: params.subject_id },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "text/plain",
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              if (response.data.status === "success") {
                Swal.fire("Deleted!", response.data.message, "success");
                fetchData();
              } else if (response.data.status === "error") {
                Swal.fire(response.data.message);
              }
            });
        } catch (error) {
          throw error;
        }
      }
    });
  };

  return (
    <React.Fragment>
      {Summary.length > 0 ? (
        <div className="DeleteSammary">
          <div className="container">
            {Summary.map((pdf) => (
              <div
                className="card"
                key={pdf.summary_id}
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
              >
                <div className="data">
                  <h1>{pdf.summary_name}</h1>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => HandleDeleteSammary(pdf)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="No_Summary">
          <div className="container">
            <Player
              autoplay={true}
              loop={true}
              controls={false}
              src="https://assets1.lottiefiles.com/packages/lf20_onjuzgsi.json"
              className="No_SummaryPlayer"
            ></Player>
            <p>There is No Summary </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default DeleteSammary;
