import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast_Handelar from "../../js/components/Toast_Handelar";
import axios from "axios";

// get all Videos
export const GetAllVideos = createAsyncThunk(
  "GetAllVideos",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Videos`,
        { Subject_Id: payload },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Sorry we can't get Videos !");
    }
  }
);

// Delete Videos
export const DeleteVideos = createAsyncThunk(
  "DeleteVideos",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Videos/Remove`,
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

// Update Videos
export const UpdateVideos = createAsyncThunk(
  "UpdateVideos",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Videos/Update`,
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

export const UpdateVideosShown = createAsyncThunk(
  "UpdateVideosShown",
  async (payload) => {
    const { Token } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API}/Videos/Update/Shown`,
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

const VideosSlice = createSlice({
  name: "VideosSlice",
  initialState: {
    Videos: [],
    loading: false,
    progress: 0,
  },
  reducers: {
    InsertVideo: (Sate, action) => {
      const all_Videos = [...Sate.Videos];
      all_Videos.push(action.payload);
      Sate.Videos = all_Videos;
    },
    DeleteVideoLocal: (Sate, action) => {
      const all_Videos = [...Sate.Videos];
      const NewData = all_Videos.filter((data) => data._id !== action.payload);
      Sate.Videos = NewData;
    },
    UpdateVideoLocal: (Sate, action) => {
      const all_Videos = [...Sate.Videos];
      const NewData = all_Videos.filter(
        (data) => data._id == action.payload._id
      )[0];
      const index = all_Videos.indexOf(NewData);
      all_Videos[index] = {
        ...NewData,
        Title: action.payload.Title,
        Description: action.payload.Description,
      };
      Sate.Videos = all_Videos;
    },
    UpdateVideoShownLocal: (Sate, action) => {
      const all_Videos = [...Sate.Videos];
      const NewData = all_Videos.filter(
        (data) => data._id == action.payload
      )[0];
      const index = all_Videos.indexOf(NewData);
      all_Videos[index] = {
        ...NewData,
        Shown: !all_Videos[index].Shown,
      };
      Sate.Videos = all_Videos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllVideos.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(GetAllVideos.rejected, (State, action) => {
      State.loading = false;
    });
    builder.addCase(GetAllVideos.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.Videos = action.payload.Data;
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });

    builder.addCase(DeleteVideos.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(UpdateVideos.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(UpdateVideosShown.fulfilled, (State, action) => {
      if (action.payload.Status !== "Faild") {
        Toast_Handelar("success", action.payload.message);
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
  },
});

export const {
  UpdateVideoLocal,
  DeleteVideoLocal,
  InsertVideo,
  UpdateVideoShownLocal,
} = VideosSlice.actions;

export default VideosSlice.reducer;
