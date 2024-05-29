import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "../../js/components/Toast_Handelar";

export const GetAdminDashBoadrdData = createAsyncThunk(
  "GetAdminDashBoadrdData",
  async () => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.get(
        `${process.env.REACT_APP_API}/Admin/Status`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your Chats !");
    }
  }
);

export const GetSingleStudent = createAsyncThunk(
  "GetSingleStudent",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.get(
        `${process.env.REACT_APP_API}/Admin/Student/${payload}`,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your Chats !");
    }
  }
);

export const StudentAdminChandeAvatar = createAsyncThunk(
  "StudentAdminChandeAvatar",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Student/UpdataAvatar`,
          {
            _id: payload._id,
            Token: payload.Token,
            Avatar: payload.File,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Token,
            },
          }
        )
        .then((res) => {
          if (res.data.Status !== "Faild") {
            Toast_Handelar("success", res.data.message);
          } else {
            Toast_Handelar("error", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your data !");
    }
  }
);

export const StudentAdminRemoveAvatar = createAsyncThunk(
  "StudentAdminRemoveAvatar",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Student/RemoveAvatar`,
          {
            _id: payload._id,
            Token: payload.Token,
          },
          {
            headers: {
              Authorization: Token,
            },
          }
        )
        .then((res) => {
          if (res.data.Status !== "Faild") {
            Toast_Handelar("success", res.data.message);
          } else {
            Toast_Handelar("error", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get your data !");
    }
  }
);

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState: {
    Loading: false,
    Students: [],
    SingleStudent: {},
    Parents: [],
    SingleParent: {},
    Instructors: [],
    SingleInstructor: {},
    Admins: [],
    SingleAdmin: {},
    Status: {
      Students: 0,
      Parent: 0,
      Instructor: 0,
      Admin: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAdminDashBoadrdData.rejected, (State, action) => {
      State.Loading = false;
    });
    builder.addCase(GetAdminDashBoadrdData.pending, (State, action) => {
      State.Loading = true;
    });
    builder.addCase(GetAdminDashBoadrdData.fulfilled, (State, action) => {
      State.Loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Students = action.payload.Data.Students;
          State.Parents = action.payload.Data.Parents;
          State.Instructors = action.payload.Data.Instructor;
          State.Admins = action.payload.Data.Admins;
          State.Status = action.payload.Data.Status;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
    builder.addCase(GetSingleStudent.fulfilled, (State, action) => {
      State.Loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.SingleStudent = action.payload.Data;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
  },
});

export const {} = AdminSlice.actions;

export default AdminSlice.reducer;
