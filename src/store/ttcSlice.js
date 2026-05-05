import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTtcAlerts = createAsyncThunk(
    "ttc/fetchAlerts",
    async () => {
      const res = await fetch("http://localhost:5001/api/ttc"); // your local API
      const data = await res.json();
  
      const rawAlerts = data.siteWideCustom || [];
  
      const filtered = rawAlerts.filter(
        (alert) =>
          alert.routeType === "Subway" &&
          ["REDUCED_SERVICE", "NO_SERVICE", "CLOSURE"].includes(alert.effect)
      );
  
      return filtered;
    }
  );

const ttcSlice = createSlice({
  name: "ttc",
  initialState: {
    alerts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTtcAlerts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTtcAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchTtcAlerts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ttcSlice.reducer;