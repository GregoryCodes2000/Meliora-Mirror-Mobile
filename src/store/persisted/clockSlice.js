import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeZone:
    Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  is24Hour: true,
  timeColor: "#ffffff",
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    setTimeZone: (state, action) => {
      state.timeZone = action.payload;
    },

    setIs24Hour: (state, action) => {
      state.is24Hour = action.payload;
    },

    setTimeColor: (state, action) => {
      state.timeColor = action.payload;
    },
  },
});

export const {
  setTimeZone,
  setIs24Hour,
  setTimeColor,
} = clockSlice.actions;

export default clockSlice.reducer;