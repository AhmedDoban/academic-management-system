import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Student Exams
export const GetExamsResult = createAsyncThunk(
  "GetExamsResult",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Result`,
        { Student_ID: payload._id },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your data !");
    }
  }
);

// get all Student semester subjects
export const GetSubjectExams = createAsyncThunk(
  "GetSubjectExams",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Exams/Result/${payload.Subject_id}`,
        { Student_ID: payload.Student_ID },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your data !");
    }
  }
);

const ParentSlice = createSlice({
  name: "ParentSlice",
  initialState: {
    Exams: [],
    SingleExamAnswers: [],
    Subjects: [],
    loading: false,
  },
  reducers: {
    GetSingleExam: (State, action) => {
      const AllExams = [...State.Subjects];
      const SingleExam = AllExams.filter(
        (ex) => ex.Exam_ID === action.payload
      )[0];
      State.SingleExamAnswers = SingleExam.Answers;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetExamsResult.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetExamsResult.rejected, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetExamsResult.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.Exams = action.payload.Data;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(GetSubjectExams.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.Subjects = action.payload.Data;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(GetSubjectExams.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetSubjectExams.rejected, (State, action) => {
      State.loading = true;
    });
  },
});

export const { GetSingleExam } = ParentSlice.actions;

export default ParentSlice.reducer;
