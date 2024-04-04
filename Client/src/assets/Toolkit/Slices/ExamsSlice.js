import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Exams
export const GetAllExams = createAsyncThunk(
  "GetAllExams",
  async (payload, { getState }) => {
    const State = getState();
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Get?Page=${State.Exams.currentPage}&Limit=10`,
        { Subject_Id: payload },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get Exams !");
    }
  }
);
export const GetSingleExams = createAsyncThunk(
  "GetSingleExams",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Get/${payload._id}`,
        { Subject_Id: payload.Subject_id },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get Exams !");
    }
  }
);

// Add new Student Exam
export const AddNewExam = createAsyncThunk("AddNewExam", async (payload) => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
  try {
    const Data = await axios.post(
      `${process.env.REACT_APP_API}/Exams/Add`,
      {
        instructor_id: _id,
        Subject_Id: payload.Subject_Id,
        Title: payload.Title,
        Question: payload.Question,
        ExamEnd: payload.ExamEnd,
        ExamStart: payload.ExamStart,
      },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return Data.data;
  } catch (err) {
    Toast_Handelar("error", "Sorry we can't Add Exam !");
  }
});

// Add new Student Exam  Question
export const AddNewExamQuestion = createAsyncThunk(
  "AddNewExamQuestion",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/AddQuestion`,
        {
          _id: payload._id,
          Subject_Id: payload.Subject_Id,
          correctAnswerIndex: payload.correctAnswerIndex,
          Options: payload.Options,
          QuestionText: payload.QuestionText,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't Add Exam !");
    }
  }
);

// Delete Student Exam
export const DeleteSingleExam = createAsyncThunk(
  "DeleteSingleExam",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Remove`,
        {
          Subject_Id: payload.Subject_id,
          _id: payload._id,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't delete Exam !");
    }
  }
);

// Update Single Exam
export const UpdateSingleExam = createAsyncThunk(
  "UpdateSingleExam",
  async (payload, { getState }) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    const State = getState();

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Update`,
        {
          Subject_Id: payload.Subject_id,
          _id: payload._id,
          Shown: State.Exams.SingleExam.Shown,
          Questions: State.Exams.SingleExamQuestions,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't update Exams!");
    }
  }
);

// Update Single Exam
export const StudentAnswerExam = createAsyncThunk(
  "StudentAnswerExam",
  async (payload, { getState }) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Answer`,
        {
          Student_ID: _id,
          Exam_ID: payload.Exam_ID,
          Subject_Id: payload.Subject_id,
          Answers: payload.Answers,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't update Exams!");
    }
  }
);

const ExamsSlice = createSlice({
  name: "ExamsSlice",
  initialState: {
    Exams: [],
    SingleExam: [],
    SingleExamQuestions: [],
    number_of_pages: 1,
    currentPage: 1,
    loading: false,
  },
  reducers: {
    SeeNext: (State, action) => {
      if (State.currentPage < State.number_of_pages) {
        State.currentPage += 1;
      } else {
        return;
      }
    },
    SeePrev: (State, action) => {
      if (State.currentPage !== 0) {
        State.currentPage -= 1;
      } else {
        State.currentPage = 1;
      }
    },
    InsertExam: (State, action) => {
      const all_Exams = [...State.Exams];
      all_Exams.push(action.payload);
      State.Exams = all_Exams;
    },
    DeleteExamLocal: (Sate, action) => {
      const all_Exams = [...Sate.Exams];
      const NewData = all_Exams.filter(
        (data) => data._id !== action.payload._id
      );
      Sate.Exams = NewData;
    },
    Question_textHandelar: (State, action) => {
      const CloneData = [...State.SingleExamQuestions];
      let EditData = {
        ...CloneData[action.payload.index],
        QuestionText: action.payload.TextValue,
      };
      CloneData[action.payload.index] = EditData;

      State.SingleExamQuestions = CloneData;
    },

    Question_valid_answerHandelar: (State, action) => {
      const CloneData = [...State.SingleExamQuestions];

      let EditData = {
        ...CloneData[action.payload.index],
        correctAnswerIndex: action.payload.correctAnswerIndex,
      };

      CloneData[action.payload.index] = EditData;

      State.SingleExamQuestions = CloneData;
    },
    HideExamLocal: (State, action) => {
      State.SingleExam.Shown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllExams.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllExams.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetAllExams.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.data.Status !== "Faild") {
        State.Exams = action.payload.data.Data;
        State.number_of_pages = action.payload.data.No_Pages;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(GetSingleExams.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetSingleExams.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetSingleExams.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.SingleExam = action.payload.Data;
        State.SingleExamQuestions = action.payload.Data.Questions;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(AddNewExam.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(DeleteSingleExam.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(UpdateSingleExam.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(AddNewExamQuestion.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(StudentAnswerExam.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const {
  SeeNext,
  SeePrev,
  InsertExam,
  DeleteExamLocal,
  Question_textHandelar,
  Question_valid_answerHandelar,
  HideExamLocal,
} = ExamsSlice.actions;

export default ExamsSlice.reducer;
