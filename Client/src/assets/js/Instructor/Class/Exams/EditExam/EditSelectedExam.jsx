import React, { useEffect } from "react";
import LodingFeachData from "../../../../components/Loding Feach Data/LodingFeachData";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./EditSelectedExam.css";
import Mountain from "../../../../components/Mountain Template/Mountain";
import { Player } from "@lottiefiles/react-lottie-player";
import { useParams } from "react-router-dom";
import {
  GetSingleExams,
  HideExamLocal,
  Question_textHandelar,
  Question_valid_answerHandelar,
  UpdateSingleExam,
} from "../../../../../Toolkit/Slices/ExamsSlice";
import { useDispatch, useSelector } from "react-redux";

function EditSelectedExam() {
  const params = useParams();
  const Dispatch = useDispatch();

  const { SingleExam, loading, SingleExamQuestions } = useSelector(
    (state) => state.Exams
  );

  useEffect(() => {
    Dispatch(
      GetSingleExams({
        Subject_id: params.Subject_id,
        _id: params.Exam_id,
      })
    );
  }, []);

  const HandleValidAnswer = (index, value, options) => {
    const AnswerIndex = options.indexOf(value);
    Dispatch(
      Question_valid_answerHandelar({ index, correctAnswerIndex: AnswerIndex })
    );
  };

  return (
    <React.Fragment>
      <Mountain>
        <div className="data">
          <h1> Ediit {params.examName}</h1>
        </div>
      </Mountain>
      <div className="EditSelectedExam">
        {loading ? (
          <LodingFeachData />
        ) : (
          <div className="container">
            {SingleExamQuestions.length > 0 ? (
              <React.Fragment>
                <p>
                  note : all Changes not saved you must when finished just click
                  update changes to save changes in server
                </p>
                {SingleExamQuestions.map((Qu, index) => (
                  <div className="card" key={Qu.question_id}>
                    <div className="data">
                      <div className="input-card">
                        <input
                          type="text"
                          name={Qu.QuestionText}
                          value={Qu.QuestionText}
                          onChange={(e) =>
                            Dispatch(
                              Question_textHandelar({
                                index,
                                TextValue: e.target.value,
                              })
                            )
                          }
                        />
                        <label htmlFor={Qu.QuestionText}>Question Text</label>
                      </div>
                      <div className="input-card">
                        <p>
                          Valid Answer Is : {Qu.Options[Qu.correctAnswerIndex]}
                        </p>
                      </div>
                      <div className="input-card">
                        <Dropdown
                          options={Qu.Options}
                          onChange={(e) =>
                            HandleValidAnswer(index, e.value, Qu.Options)
                          }
                          placeholder="Answers"
                          value={Qu.Options[Qu.correctAnswerIndex]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="Controllers">
                  <div className="card">
                    <button
                      onClick={() =>
                        Dispatch(
                          UpdateSingleExam({
                            Subject_id: params.Subject_id,
                            _id: params.Exam_id,
                          })
                        )
                      }
                    >
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src={require("../../../../../img/Players/UpdateChanges.json")}
                        className="Player"
                      />
                      Update Changes
                    </button>
                  </div>
                  <div className="card">
                    <button
                      onClick={() => Dispatch(HideExamLocal(!SingleExam.Shown))}
                    >
                      <Player
                        autoplay={true}
                        loop={true}
                        controls={false}
                        src={require("../../../../../img/Players/MakeVisable.json")}
                        className="Player"
                      />
                      Make Exam {SingleExam.Shown ? "Hidden" : "Visable"}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div className="NoQu">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require("../../../../../img/Players/NoExams.json")}
                  className="NoQuPlayer"
                />
                <p>There are no Questions you must create Question first </p>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default EditSelectedExam;
