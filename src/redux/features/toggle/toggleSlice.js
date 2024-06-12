import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDrawer: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawer = !state.cartDrawer;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleCartDrawer } = toggleSlice.actions;

export default toggleSlice.reducer;
