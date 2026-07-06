import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import stockReducer from "./stockSlice";
import ttcReducer from "./ttcSlice";
import weatherReducer from "./weatherSlice";
import newsReducer from "./newsSlice";
import screenReducer from "./persisted/gridSlice";
import switchesReducer from "./persisted/switchesSlice";
import clockReducer from "./persisted/clockSlice";
import themeReducer from "./persisted/themeSlice";



const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  stock: stockReducer,
  ttc: ttcReducer,
  weather: weatherReducer,
  news: newsReducer,
  screen: screenReducer,
  switches: switchesReducer,
  clock: clockReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;