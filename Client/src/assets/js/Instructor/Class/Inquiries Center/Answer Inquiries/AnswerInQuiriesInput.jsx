import React, { useState } from "react";

function AnswerInQuiriesInput(props) {
  const [InquirieAnswer, SetInquirieAnswer] = useState("");

  const HandleAnswerInqu = async () => {
    if (InquirieAnswer !== "") {
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
