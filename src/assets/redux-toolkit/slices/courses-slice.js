import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

let api = "http://localhost:3000/CourcesDB";
// View All Students
export const ViewAllCourses = createAsyncThunk(
  "StudentSlice/ViewAllStudent",
  async () => {
    const data = await axios.get(api).then((response) => response.data);
    return data;
  }
);

// Delete Student
export const DeleteCourse = createAsyncThunk(
  "StudentSlice/DeleteStudent",
  async (Target_Student) => {
    console.log("S");
    await Swal.fire({
      title: "Are you sure?",
      text: `You won't Delete this Student ? `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${api}/${Target_Student}`);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
);

export const CoursesSlice = createSlice({
  initialState: [],
  name: "CoursesSlice",
  extraReducers(builder) {
    // View All Courses
    builder
      .addCase(ViewAllCourses.fulfilled, (state, action) => {
        return action.payload;
      })
      // Delete Course
      .addCase(DeleteCourse.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});
export const {} = CoursesSlice.actions;

export default CoursesSlice.reducer;
