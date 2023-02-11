import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "./slices/student-slice";
export const store = configureStore({
  reducer: { Student: StudentSlice },
  devTools: false,
});
