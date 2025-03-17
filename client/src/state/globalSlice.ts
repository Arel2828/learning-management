// src/state/globalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Your initial global state here
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Your global reducers here
  },
});

export const {
  /* Export your actions here */
} = globalSlice.actions;
export default globalSlice.reducer;
