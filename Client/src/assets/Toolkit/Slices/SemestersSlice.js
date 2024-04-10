import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all  Student semester
export const GetStudentSemesters = createAsyncThunk(
  "GetStudentSemesters",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Semester/StudentSemester`,
        { _id, Token, Student_national_id: State.User.user.national_ID },
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
export const GetStudentSemestersSubjects = createAsyncThunk(
  "GetStudentSemestersSubjects",
  async (payload) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Semester/StudentSemesterSubjects`,
        { Student_ID: _id, Semester_id: payload.Semester_id },
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

export const GetAllInstructorSubjects = createAsyncThunk(
  "GetAllInstructorSubjects",
  async (payload) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Subjects/Instructor/InstructorSubjects`,
        { instructor_id: _id },
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

const NewSemesterSlice = createSlice({
  name: "NewSemesterSlice",
  initialState: {
    Subjects: [],
    Semesters: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetStudentSemesters.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetStudentSemesters.rejected, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetStudentSemesters.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Semesters = action.payload.Data;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
    builder.addCase(GetStudentSemestersSubjects.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Subjects = action.payload.Data;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
    builder.addCase(GetStudentSemestersSubjects.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetStudentSemestersSubjects.rejected, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllInstructorSubjects.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Subjects = action.payload.Data;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
    builder.addCase(GetAllInstructorSubjects.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllInstructorSubjects.rejected, (State, action) => {
      State.loading = true;
    });
  },
});
//eslint-disable-next-line
export const {} = NewSemesterSlice.actions;

export default NewSemesterSlice.reducer;
