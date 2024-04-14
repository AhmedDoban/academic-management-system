import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Books
export const GetBooks = createAsyncThunk(
  "Library/GetBooks",
  async (payload) => {
    try {
      const Data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          payload !== "" ? payload : "space"
        }&key=${process.env.REACT_APP_GOOGLE_KEY}&maxResults=40`
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry , We can't get books !");
    }
  }
);

const LibrarySlice = createSlice({
  name: "LibrarySlice",
  initialState: {
    Books: [],
    SingleBook: {},
    loading: false,
  },
  reducers: {
    getSingleBook: (State, action) => {
      State.SingleBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetBooks.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetBooks.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetBooks.fulfilled, (State, action) => {
      if (action.payload !== undefined) {
        State.Books = action.payload.items;
        State.loading = false;
      }
    });
  },
});

export const { getSingleBook } = LibrarySlice.actions;

export default LibrarySlice.reducer;
