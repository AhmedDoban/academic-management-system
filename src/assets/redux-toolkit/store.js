import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./slices/courses-slice";
import StudentSlice from "./slices/student-slice";

const reducers = combineReducers({
  Student: StudentSlice,
  Courses: coursesSlice,
});

export const store = configureStore({
  reducer: reducers
});
