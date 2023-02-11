import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

let api = "http://localhost:3000/students";
// View All Students
export const ViewAllStudent = createAsyncThunk(
  "StudentSlice/ViewAllStudent",
  async () => {
    const data = await axios.get(api).then((response) => response.data);
    return data;
  }
);

// View Student
export const ViewStudent = createAsyncThunk(
  "StudentSlice/ViewStudent",
  async (id) => {
    const data = await axios
      .get(`${api}/${id}`)
      .then((response) => response.data);
    return data;
  }
);

// Delete Student

export const DeleteStudent = createAsyncThunk(
  "StudentSlice/DeleteStudent",
  async (Target_Student) => {
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

export const StudentSlice = createSlice({
  initialState: [],
  name: "StudentSlice",

  extraReducers(builder) {
    // View All Student
    builder
      .addCase(ViewAllStudent.fulfilled, (state, action) => {
        return action.payload;
      })
      // View Student
      .addCase(ViewStudent.fulfilled, (state, action) => {
        return action.payload;
      })
      // Delete Student
      .addCase(DeleteStudent.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});
export const {} = StudentSlice.actions;

export default StudentSlice.reducer;
