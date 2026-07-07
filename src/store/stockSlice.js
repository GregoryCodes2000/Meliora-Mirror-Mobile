import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("stockData"));

const initialState = saved || {
  selectedTicker: "AAPL",
  price: null,
  change: null,
  series: [],
  timestamp: 0,
  loading: false,
  error: null,
};

// ------------------ FETCH ACTION ------------------
export const fetchStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (tickerArg, { getState, rejectWithValue }) => {
    const { stock } = getState();
    const ticker = tickerArg || stock.selectedTicker || "AAPL";
    const API_KEY = process.env.FINNHUB_API_KEY;

    try {
      const res = await fetch(
        `/.netlify/functions/stock?symbol=${ticker}`
      );
      
      const data = await res.json();

      if (!data.quote || data.quote.c === undefined) {
        return rejectWithValue("No data from API");
      }

      // Mock series for sparkline (30 points around current price)
      /* const series = Array.from({ length: 30 }, (_, i) => data.c - Math.random()); */

      return {
        price: data.quote.c,
        change: data.quote.c - data.quote.pc,
        series: data.candles,
        timestamp: Date.now(),
        symbol: ticker,
      };
    } catch (err) {
      return rejectWithValue(err.message || "Fetch failed");
    }
  }
);

// ------------------ SLICE ------------------
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedTicker(state, action) {
      state.selectedTicker = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.price = action.payload.price;
        state.change = action.payload.change;
        state.series = action.payload.series;
        state.timestamp = action.payload.timestamp;
        state.selectedTicker = action.payload.symbol;

        localStorage.setItem("stockData", JSON.stringify(state));
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching stock";
      });
  },
});

export const { setSelectedTicker } = stockSlice.actions;
export default stockSlice.reducer;