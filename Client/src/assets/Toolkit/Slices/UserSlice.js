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

export const UserRegister = createAsyncThunk(
  "User/Register",
  async (payload) => {
    try {
      await axios
        .post(payload.URL, {
          national_ID: payload.USER.national_ID,
          password: payload.USER.password,
          Mobile: payload.USER.Mobile,
          email: payload.USER.email,
          name: payload.USER.name,
          parent_national_ID: payload.USER.parent_national_ID,
        })
        .then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            Toast_Handelar("success", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Something happens wrong !");
    }
  }
);

export const Login_USER_Local = createAsyncThunk(
  "User/Login_USER_Local",
  async () => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    const Type = JSON.parse(localStorage.getItem("TYPE"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/${Type}/${_id}`,
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

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    loading: false,
    Token: "",
    IsLogin: false,
    changeAvatar: {
      status: false,
      path: "",
    },
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
    ChangeStatus: (State, action) => {
      State.changeAvatar.status = action.payload;
    },
    HandleChandeAvatar: (State, action) => {
      if (State.changeAvatar.status) {
        State.changeAvatar.path = action.payload;
      } else {
        State.user.Avatar = action.payload;
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
          })
        );
        localStorage.setItem("TYPE", JSON.stringify(action.meta.arg.Type));
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(Login_USER_Local.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(Login_USER_Local.rejected, (State, action) => {
      State.loading = true;
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

export const { Login_Local, ChangeStatus, HandleChandeAvatar } =
  UserSlice.actions;

export default UserSlice.reducer;
