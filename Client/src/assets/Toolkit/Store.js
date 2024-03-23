import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";

const Store = configureStore({
  reducer: {
    User: UserSlice,
  },
});

export default Store;
