import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Inquiries
export const GetAllInquiries = createAsyncThunk(
  "GetAllInquiries",
  async (payload, { getState }) => {
    const State = getState();
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Inquiries?Page=${State.NewSemester.currentPage}&Limit=10`,
        { Subject_Id: payload },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get Inquiries !");
    }
  }
);

// Add new Student Inquiry
export const AddNewInquiry = createAsyncThunk(
  "AddNewInquiry",
  async (payload, { getState }) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Inquiries/Add`,
        {
          Subject_Id: payload.Subject_Id,
          Student_ID: _id,
          Question: payload.Question,
        },
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

const InquiriesSlice = createSlice({
  name: "InquiriesSlice",
  initialState: {
    Inquiries: [],
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
    InsertInquiry: (Sate, action) => {
      const all_Inquiries = [...Sate.Inquiries];
      all_Inquiries.push(action.payload);
      Sate.Inquiries = all_Inquiries;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllInquiries.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllInquiries.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetAllInquiries.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.data.Status !== "Faild") {
        State.Inquiries = action.payload.data.Data;
        State.number_of_pages = action.payload.data.No_Pages;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(AddNewInquiry.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const { SeeNext, SeePrev, InsertInquiry } = InquiriesSlice.actions;

export default InquiriesSlice.reducer;
