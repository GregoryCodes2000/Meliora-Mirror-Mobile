import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import ttcReducer from "./ttcSlice";

const store = configureStore({
  reducer: {
    stock: stockReducer,
    ttc: ttcReducer,
  },
});



export default store;