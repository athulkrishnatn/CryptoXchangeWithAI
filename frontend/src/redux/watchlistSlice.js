import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
      localStorage.setItem("watchlist", JSON.stringify(action.payload));
    },
    addToWatchlist: (state, action) => {
      if (!state.watchlist.includes(action.payload)) {
        state.watchlist.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((coin) => coin !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
  },
});

export const { setWatchlist, addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
