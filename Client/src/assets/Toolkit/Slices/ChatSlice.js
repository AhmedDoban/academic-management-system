import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all chat
export const GetChats = createAsyncThunk("Chat/GetChats", async (payload) => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
  try {
    const Data = await axios.post(
      `${process.env.REACT_APP_API}/Chats`,
      { Student_ID: _id, Token: Token, Subject_Id: payload.Subject_Id },
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
});

// Add new message
export const New_Message = createAsyncThunk(
  "Chat/New_Message",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Chats/Add`,
        {
          Subject_Id: payload.Subject_Id,
          Message: payload.Message,
          User_Avatar: State.User.user.Avatar,
          User_Id: _id,
          User_Name: State.User.user.name,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't Add your message !");
    }
  }
);

const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState: {
    Chats: [],
    loading: false,
  },
  reducers: {
    InsertMessage: (State, action) => {
      const NewMessage = [...State.Chats];
      NewMessage.push(action.payload);
      State.Chats = NewMessage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetChats.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetChats.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetChats.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Chats = action.payload.Data;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
  },
});

export const { InsertMessage } = ChatSlice.actions;

export default ChatSlice.reducer;
