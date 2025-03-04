import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import watchlistReducer from "./watchlistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
