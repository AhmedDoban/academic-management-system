import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import NewSemesterSlice from "./Slices/NewSemesterSlice";
import SemestersSlice from "./Slices/SemestersSlice";
import InquiriesSlice from "./Slices/InquiriesSlice";

const Store = configureStore({
  reducer: {
    User: UserSlice,
    NewSemester: NewSemesterSlice,
    Semester: SemestersSlice,
    Inquiries: InquiriesSlice,
  },
});

export default Store;
