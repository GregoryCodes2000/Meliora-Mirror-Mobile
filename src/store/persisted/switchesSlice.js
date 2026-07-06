import { createSlice } from "@reduxjs/toolkit";

const switchesSlice = createSlice({
  name: "switches",

  initialState: {
    options: {},
  },

  reducers: {
    setOptions(state, action) {
      state.options = action.payload;
    },
  },
});

export const { setOptions } = switchesSlice.actions;

export default switchesSlice.reducer;