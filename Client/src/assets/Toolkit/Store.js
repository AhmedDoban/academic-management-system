import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import NewSemesterSlice from "./Slices/NewSemesterSlice";
import SemestersSlice from "./Slices/SemestersSlice";
import InquiriesSlice from "./Slices/InquiriesSlice";
import VideosSlice from "./Slices/VideosSlice";
import SummarySlice from "./Slices/SummarySlice";
import ExamsSlice from "./Slices/ExamsSlice";
import ParentSlice from "./Slices/ParentSlice";

const Store = configureStore({
  reducer: {
    User: UserSlice,
    NewSemester: NewSemesterSlice,
    Semester: SemestersSlice,
    Inquiries: InquiriesSlice,
    Videos: VideosSlice,
    Summary: SummarySlice,
    Exams: ExamsSlice,
    Parent: ParentSlice,
  },
});

export default Store;
