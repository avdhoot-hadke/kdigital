import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    value: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProjects: (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProject: (state, action) => {
      state.value.push(action.payload);
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setProjects, addProject } = projectsSlice.actions;

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/project", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzkzNWJhMzYwNWZhM2JmNzY2MmQxMCIsImlhdCI6MTcxOTIxOTY0M30.HfJw5VL_wnnmM75lA5vaviWcitLHnRFeoXHnVvMFggE",
      },
    });
    if (response.status != 200) {
      throw new Error("Failed to fetch projects");
    }
    dispatch(setProjects(response.data.project));
  } catch (error) {
    console.log(error);
  }
};

export default projectsSlice.reducer;
