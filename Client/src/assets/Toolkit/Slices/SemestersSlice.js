import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all semester subjects
export const GetStudentSemesters = createAsyncThunk(
  "GetStudentSemesters",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Semestes/StudentSemester`,
        { _id, Token },
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
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetStudentSemesters.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.Subjects = action.payload.Data;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const {} = NewSemesterSlice.actions;

export default NewSemesterSlice.reducer;
