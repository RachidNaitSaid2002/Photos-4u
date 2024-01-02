import { createSlice } from "@reduxjs/toolkit";

const SavedSlice = createSlice({
  name: "Save",
  initialState: [], // Define the initial state here
  reducers: {
    addPh_S: (state, action) => {
      state.push(action.payload);
    },
    delPh_S: (state, action) => {
      const index = state.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export default SavedSlice.reducer;
export const { addPh_S, delPh_S } = SavedSlice.actions;