import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layout: [],
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGridLayout(state, action) {
      state.layout = action.payload;
    },
  },
});

export const { setGridLayout } = gridSlice.actions;
export default gridSlice.reducer;