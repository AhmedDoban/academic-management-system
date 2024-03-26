import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all semester subjects
export const GetSubjects = createAsyncThunk(
  "GetSubjects",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Subjects?Page=${State.NewSemester.currentPage}&Limit=10`,
        { _id, Token },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your data !");
    }
  }
);

const NewSemesterSlice = createSlice({
  name: "NewSemesterSlice",
  initialState: {
    Subjects: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(GetSubjects.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.data.Status !== "Faild") {
        State.Subjects = action.payload.data.Data;
        State.number_of_pages = action.payload.data.No_Pages;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const { SeeNext, SeePrev } = NewSemesterSlice.actions;

export default NewSemesterSlice.reducer;
