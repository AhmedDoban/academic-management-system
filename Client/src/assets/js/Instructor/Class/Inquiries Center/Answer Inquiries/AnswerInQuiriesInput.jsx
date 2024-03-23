import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AnswerInQuiriesInput(props) {
  const [InquirieAnswer, SetInquirieAnswer] = useState("");
  const url = `${process.env.REACT_APP_API}/doctor/answer_inquiry.php`;

  const HandleAnswerInqu = async () => {
    if (InquirieAnswer !== "") {
      try {
        await axios
          .post(
            url,
            {
              answer: InquirieAnswer,
              doctor_id: props.doctor_id,
              question_id: props.Inquirie.ask_id,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
              },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              SetInquirieAnswer("");
              props.fetchData();
            } else if (response.data.status === "error") {
              toast.warn(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          });
      } catch (err) {
        throw err;
      }
    }
  };
  return (
    <React.Fragment>
      <div className="input-card">
        <input
          type="text"
          value={InquirieAnswer}
          onChange={(e) => SetInquirieAnswer(e.target.value)}
          placeholder="Type an Answer "
        />
        <button onClick={() => HandleAnswerInqu()}>
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </React.Fragment>
  );
}
export default AnswerInQuiriesInput;
