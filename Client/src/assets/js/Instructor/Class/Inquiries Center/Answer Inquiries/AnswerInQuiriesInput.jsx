import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  UpdateInquiry,
  UpdateInquiryLocal,
} from "../../../../../Toolkit/Slices/InquiriesSlice";
import Toast_Handelar from "../../../../components/Toast_Handelar";

function AnswerInQuiriesInput({ Subject_id, _id }) {
  const Dispatch = useDispatch();
  const [InquiryAnswer, SetInquiryAnswer] = useState("");

  const HandleAnswerInqu = () => {
    if (InquiryAnswer !== "") {
      Dispatch(
        UpdateInquiry({
          Subject_Id: Subject_id,
          _id: _id,
          Answer: InquiryAnswer,
        })
      ).then((res) => {
        if (res.payload.Satus !== "Faild") {
          Dispatch(UpdateInquiryLocal({ _id, Answer: InquiryAnswer }));
          SetInquiryAnswer("");
        }
      });
    } else {
      Toast_Handelar("error", "input in empty !");
    }
  };

  const HandleAnswerWithEnter = (e) => {
    if (InquiryAnswer !== "" && e.key === "Enter") {
      Dispatch(
        UpdateInquiry({
          Subject_Id: Subject_id,
          _id: _id,
          Answer: InquiryAnswer,
        })
      ).then((res) => {
        if (res.payload.Satus !== "Faild") {
          Dispatch(UpdateInquiryLocal({ _id, Answer: InquiryAnswer }));
          SetInquiryAnswer("");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className="input-card">
        <textarea
          type="text"
          value={InquiryAnswer}
          onChange={(e) => SetInquiryAnswer(e.target.value)}
          placeholder="Type an Answer "
          onKeyPress={(e) => HandleAnswerWithEnter(e)}
        />
        <button onClick={() => HandleAnswerInqu()}>
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </React.Fragment>
  );
}
export default AnswerInQuiriesInput;
