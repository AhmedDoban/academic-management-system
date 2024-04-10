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

export const Change_USER_Password = createAsyncThunk(
  "User/Change_USER_Password",
  async (payload) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    const Type = JSON.parse(localStorage.getItem("TYPE"));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/${Type}/Password`,
          {
            _id: _id,
            Token: Token,
            NewPassword: payload.NewPassword,
            OldPassword: payload.OldPassword,
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

export const Change_USER_Setting = createAsyncThunk(
  "User/Change_USER_Setting",
  async (payload, { getState }) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    const Type = JSON.parse(localStorage.getItem("TYPE"));
    const State = getState();
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/${Type}/Setting`,
          {
            _id: _id,
            Token: Token,
            Mobile: State.User.user.Mobile,
            Location: State.User.user.Location,
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

export const Change_USER_Avatar = createAsyncThunk(
  "User/Change_USER_Avatar",
  async (payload) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    const Type = JSON.parse(localStorage.getItem("TYPE"));

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/${Type}/UpdataAvatar`,
          {
            _id: _id,
            Token: Token,
            Avatar: payload,
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

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    Child: {},
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
    UserInSemester: (State, action) => {
      State.user.IsInsemester = action.payload;
    },
    GetChild: (State, action) => {
      const AllChildrens = [...State.user.Childrens];
      const Child = AllChildrens.filter((Ch) => Ch._id === action.payload)[0];
      State.Child = Child;
    },
    ChangeInputLocal: (State, action) => {
      const NewUser = { ...State.user };
      const { name, value } = action.payload.target;
      const updateUser = { ...NewUser, [name]: value };
      State.user = updateUser;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserRegister.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(UserRegister.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(UserRegister.fulfilled, (State, action) => {
      State.loading = false;
    });
    builder.addCase(UserLogin.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(UserLogin.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(UserLogin.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined && action.payload.Status !== "Faild") {
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
        if (action.payload !== undefined) {
          Toast_Handelar("error", action.payload.message);
        }
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
      console.log(action.payload);
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.IsLogin = true;
          State.user = action.payload.Data;
          State.Token = action.payload.Data.Token;
        } else {
          State.IsLogin = false;
          localStorage.clear();
          Toast_Handelar("error", action.payload.message);
        }
      } else {
        State.IsLogin = false;
        localStorage.clear();
        Toast_Handelar("error", "can't connect to the server !");
      }
    });
  },
});

export const {
  Login_Local,
  ChangeStatus,
  HandleChandeAvatar,
  UserInSemester,
  GetChild,
  ChangeInputLocal,
} = UserSlice.actions;

export default UserSlice.reducer;
