import { configureStore } from "@reduxjs/toolkit";
import watchListReduce from "./watchListSlice";

export const store = configureStore({
  reducer: {
    watchlist: watchListReduce,
  },
});
