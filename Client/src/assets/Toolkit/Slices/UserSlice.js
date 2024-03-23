import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "./../../js/components/Toast_Handelar";

export const UserLogin = createAsyncThunk("User/Login", async (USER) => {
  try {
    const Data = await axios.post(`${USER.URL}`, {
      national_ID: USER.national_ID,
      password: USER.password,
    });
    return Data.data;
  } catch (err) {
    Toast_Handelar("error", "Something happens wrong !");
  }
});

export const Login_USER_Local = createAsyncThunk(
  "User/Login_USER_Local",
  async () => {
    const { Token: TOKEN, _id: _ID } = JSON.parse(
      localStorage.getItem("Token")
    );

    const Data = await axios.post(
      `${process.env.REACT_APP_API_URL}/Users/${_ID}`,
      { _id: _ID, Token: TOKEN },
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    return Data.data;
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    loading: false,
    Token: "",
    IsLogin: false,
  },
  reducers: {
    Login_Local: (State, action) => {
      const CheckLogin = JSON.parse(
        localStorage.getItem("Academic_System_Login")
      );
      if (CheckLogin !== null) {
        State.IsLogin = true;
        return;
      } else {
        State.IsLogin = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(UserLogin.rejected, (State, action) => {
      State.loading = true;
    });
    builder.addCase(UserLogin.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.IsLogin = true;
        State.user = action.payload.Data;
        State.Token = action.payload.Data.Token;
        localStorage.setItem("Academic_System_Login", JSON.stringify(true));
        localStorage.setItem(
          "Token",
          JSON.stringify({
            Token: action.payload.Data.Token,
            _id: action.payload.Data._id,
            Role: action.payload.Data.Role,
          })
        );
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(Login_USER_Local.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.IsLogin = true;
        State.user = action.payload.Data;
        State.Token = action.payload.Data.Token;
      } else {
        State.IsLogin = false;
        localStorage.clear();
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const { Login_Local } = UserSlice.actions;

export default UserSlice.reducer;
