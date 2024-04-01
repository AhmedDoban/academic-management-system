import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Summary
export const GetAllSummary = createAsyncThunk(
  "GetAllSummary",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Summary`,
        { Subject_Id: payload },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get Summary !");
    }
  }
);

// Delete Summary
export const DeleteSummary = createAsyncThunk(
  "DeleteSummary",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Summary/Remove`,
        {
          Subject_Id: payload.Subject_Id,
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
      Toast_Handelar("error", "Sorry we can't delete Video !");
    }
  }
);

// Update Summary
export const UpdateSummary = createAsyncThunk(
  "UpdateSummary",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Summary/Update`,
        {
          Subject_Id: payload.Subject_Id,
          _id: payload._id,
          Title: payload.Title,
          Description: payload.Description,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't update Video !");
    }
  }
);

export const UpdateSummaryShown = createAsyncThunk(
  "UpdateSummaryShown",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Summary/Update/Shown`,
        {
          Subject_Id: payload.Subject_Id,
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
      Toast_Handelar("error", "Sorry we can't update Video !");
    }
  }
);

const SummarySlice = createSlice({
  name: "SummarySlice",
  initialState: {
    Summary: [],
    loading: false,
    progress: 0,
  },
  reducers: {
    InsertSummary: (Sate, action) => {
      const all_Summary = [...Sate.Summary];
      all_Summary.push(action.payload);
      Sate.Summary = all_Summary;
    },
    DeleteSummaryLocal: (Sate, action) => {
      const all_Summary = [...Sate.Summary];
      const NewData = all_Summary.filter((data) => data._id !== action.payload);
      Sate.Summary = NewData;
    },
    UpdateSummaryLocal: (Sate, action) => {
      const all_Summary = [...Sate.Summary];
      const NewData = all_Summary.filter(
        (data) => data._id == action.payload._id
      )[0];
      const index = all_Summary.indexOf(NewData);
      all_Summary[index] = {
        ...NewData,
        Title: action.payload.Title,
        Description: action.payload.Description,
      };
      Sate.Summary = all_Summary;
    },
    UpdateSummaryhownLocal: (Sate, action) => {
      const all_Summary = [...Sate.Summary];
      const NewData = all_Summary.filter(
        (data) => data._id == action.payload
      )[0];
      const index = all_Summary.indexOf(NewData);
      all_Summary[index] = {
        ...NewData,
        Shown: !all_Summary[index].Shown,
      };
      Sate.Summary = all_Summary;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllSummary.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllSummary.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetAllSummary.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.Summary = action.payload.Data;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });

    builder.addCase(DeleteSummary.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(UpdateSummary.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(UpdateSummaryShown.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const {
  UpdateSummaryLocal,
  DeleteSummaryLocal,
  InsertSummary,
  UpdateSummaryhownLocal,
} = SummarySlice.actions;

export default SummarySlice.reducer;
