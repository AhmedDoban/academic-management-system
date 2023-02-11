import { createSlice } from "@reduxjs/toolkit";
export const CoursesSlice = createSlice({
  initialState: [],
  name: "StudentSlice",
  reducers: {
    AddCourse: (state, action) => {},
    RemoveCourse: (state, action) => {},
    UpdateCourse: (state, action) => {},
    ViewCourse: (state, action) => {},
  },
});
export const { AddCourse, RemoveCourse, UpdateCourse, ViewCourse } =
  CoursesSlice.actions;

export default CoursesSlice.reducer;
