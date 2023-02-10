import { createSlice } from "@reduxjs/toolkit";
export const StudentSlice = createSlice({
  initialState: 1000,
  name: "StudentSlice",
  reducers: {
    AddStudent: (state, action) => {},
    RemoveStudet: (state, action) => {},
    UpdateStudent: (state, action) => {},
    ViewStudent: (state, action) => {},
  },
});
export const { AddStudent, RemoveStudet, UpdateStudent, ViewStudent } =
  StudentSlice.actions;

export default StudentSlice.reducer;
