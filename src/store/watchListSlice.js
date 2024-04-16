import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchlist",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      const movie = action.payload;
      return state.filter((item) => item.id !== movie.id);
    },
  },
});

export const { add, remove } = watchListSlice.actions;

export default watchListSlice.reducer;
