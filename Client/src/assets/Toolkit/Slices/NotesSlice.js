import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all student notes
export const GetNotes = createAsyncThunk("Notes/GetNotes", async () => {
  const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
  try {
    const Data = await axios.post(
      `${process.env.REACT_APP_API}/Notes`,
      { Student_ID: _id, Token: Token },
      {
        headers: {
          Authorization: Token,
        },
      }
    );
    return Data.data;
  } catch (err) {
    Toast_Handelar("error", "Sorry we can't get your Notes !");
  }
});

// (Add new or delete or update ) student note
export const CUD_StudentNote = createAsyncThunk(
  "Notes/CUD_StudentNote",
  async (payload, { getState }) => {
    const State = getState();
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Notes/Update`,
        {
          Student_ID: _id,
          Token: Token,
          Notes: State.Notes.Notes,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't update your notes !");
    }
  }
);

const NotesSlice = createSlice({
  name: "NotesSlice",
  initialState: {
    Notes: [],
    loading: false,
  },
  reducers: {
    AddNewNote: (State, action) => {
      const Notes = [...State.Notes];
      const EditNote = [
        {
          NoteDescription: action.payload.NoteDescription,
          NoteName: action.payload.NoteName,
        },
        ...Notes,
      ];
      State.Notes = EditNote;
    },
    DeleteNote: (State, action) => {
      const Notes = [...State.Notes];
      const FilterNote = Notes.filter(
        (p, index) => index !== action.payload.index
      );
      State.Notes = FilterNote;
    },
    UpdateNote: (State, action) => {
      const Notes = [...State.Notes];
      Notes[action.payload.index] = {
        NoteName: action.payload.NoteName,
        NoteDescription: action.payload.NoteDescription,
      };
      State.Notes = Notes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetNotes.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetNotes.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetNotes.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload !== undefined) {
        if (action.payload.Status !== "Faild") {
          State.Notes =
            action.payload.Data.Notes === undefined
              ? []
              : action.payload.Data.Notes;
        } else {
          Toast_Handelar("error", action.payload.message);
        }
      }
    });
  },
});

export const { AddNewNote, DeleteNote, UpdateNote } = NotesSlice.actions;

export default NotesSlice.reducer;
