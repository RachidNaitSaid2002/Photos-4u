import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favorit",
  initialState: [], // Define the initial state here
  reducers: {
    addPh: (state, action) => {
      state.push(action.payload);
    },
    delPh: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export default favSlice.reducer;
export const { addPh, delPh } = favSlice.actions;