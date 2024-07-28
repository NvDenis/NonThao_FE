import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const commonDataSlice = createSlice({
  name: "commonData",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = commonDataSlice.actions;

export default commonDataSlice.reducer;
