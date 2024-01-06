import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favorit",
  initialState: [],
  reducers: {
    addPh: (state, action) => {
      state.push(action.payload);
    },
    delPh: (state, action) => {
      const index = state.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export default favSlice.reducer;
export const { addPh, delPh } = favSlice.actions;
