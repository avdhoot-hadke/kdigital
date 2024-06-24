import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/projectSlice";

export default configureStore({
  reducer: {
    projects: projectsReducer,
  },
});
