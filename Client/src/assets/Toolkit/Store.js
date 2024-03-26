import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import NewSemesterSlice from "./Slices/NewSemesterSlice";

const Store = configureStore({
  reducer: {
    User: UserSlice,
    NewSemester: NewSemesterSlice,
  },
});

export default Store;
